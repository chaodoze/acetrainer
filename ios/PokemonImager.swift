//
//  PokemonImager.swift
//  acetrainer
//
//  Created by Chao Lam on 8/30/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import TesseractOCR
import Photos

@objc(PokemonImager)
class PokemonImager: NSObject {
  var bridge: RCTBridge!
  
  @objc func scan(_ trainerLevel: NSNumber, date: Date) -> Void {
//    let after = RCTConvert.NSDate(date)
    print("date after", date, trainerLevel)
    let screenshots = ScreenshotsMgr.fetch(date)
    for ss in screenshots {
      let pokemon = PokemonScreenshot(screenshot: ss, trainerLevel: trainerLevel as Int)
      _ = pokemon.fetchData().then { stats->Void in
        print("pstats", stats)
        self.bridge.eventDispatcher().sendAppEvent(withName: "Pokemon", body: stats)
      }
    }
  }
  
  @objc func scanOne(_ trainerLevel:NSNumber, url:NSString) -> Void {
    print("scanOne called ", trainerLevel, url)
    if let screenshot = ScreenshotsMgr.fetchOne(url) {
      let pokemon = PokemonScreenshot(screenshot:screenshot, trainerLevel: trainerLevel as Int)
      _ = pokemon.fetchData().then {stats->Void in
        print("scanOne stats", stats)
        self.bridge.eventDispatcher().sendAppEvent(withName: "Pokemon", body: stats)
      }
    }
  }
}
