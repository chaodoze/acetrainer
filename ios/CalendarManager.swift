//
//  CalendarManager.swift
//  acetrainer
//
//  Created by Chao Lam on 8/30/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import TesseractOCR
import Photos

@objc(CalendarManager)
class CalendarManager: NSObject {
  var bridge: RCTBridge!
  
  @objc func addEvent(name: String, location: String, date: NSNumber, callback: (NSObject) -> ()) -> Void {
    NSLog("hello worldzz %@ %@ %@", name, location, date)
    NSLog("Bridge: %@", self.bridge)
    let tesseract = G8Tesseract(language:"eng")
    let image = UIImage.init(named:"chansey.png")
    if image == nil {
      NSLog("@@@Image is nil")
    }
    tesseract.image = image
    tesseract.rect = CGRectMake(687, 1603, 350, 60)
    tesseract.recognize()
    let ret = [
      "name": name,
      "location": location,
      "date" : date,
      "text" : tesseract.recognizedText,
      ]
    callback([ret])
    let RFC3339DateFormatter = NSDateFormatter()
    RFC3339DateFormatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
    RFC3339DateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
    RFC3339DateFormatter.timeZone = NSTimeZone(forSecondsFromGMT: 0)
    if let date = RFC3339DateFormatter.dateFromString("2016-09-07T00:53:23+00:00") {
      
      let screenshots = ScreenshotsMgr.fetch(date)
      for ss in screenshots {
        print("got screenshot", ss.image, ss.url)
        let pokemon = PokemonScreenshot(screenshot: ss, trainerLevel: 21)
        pokemon.fetchData().then { stats->Void in
          print("pstats", stats)
          self.bridge.eventDispatcher().sendAppEventWithName("Pokemon", body: stats)
        }
      }
    }
    self.bridge.eventDispatcher().sendAppEventWithName("EventReminder", body:ret)
  }
  
  @objc func fetchPhotos() -> Void {
    let result = PHAsset.fetchAssetsWithOptions(nil)
    let asset = result.lastObject as! PHAsset
    PHImageManager.defaultManager().requestImageDataForAsset(asset, options: PHImageRequestOptions(), resultHandler:
      {
        (imagedata, dataUTI, orientation, info) in
        if info!.keys.contains(NSString(string: "PHImageFileURLKey"))
        {
          let path = info![NSString(string: "PHImageFileURLKey")] as! NSURL
          NSLog("file url %@, %d", path, result.count)
        }
    })
  }
}
