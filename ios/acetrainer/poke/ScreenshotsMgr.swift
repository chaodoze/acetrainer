//
//  FetchScreenshots.swift
//  tessTest
//
//  Created by Chao Lam on 9/7/16.
//  Copyright © 2016 Next Small Things. All rights reserved.
//

import Foundation
import UIKit
import Photos
import PromiseKit

class Screenshot {
  let url:String!
  let image:UIImage!
  init(image:UIImage, url:String) {
    self.url=url
    self.image=image
  }
}

struct ScreenshotsMgr {
  enum Err: ErrorType {
    case ImageNotFound
  }
  static let manager = PHImageManager.defaultManager()
  
  static func requestUrlForAsset(asset:PHAsset)->String {
//    let options = PHImageRequestOptions()
//    options.synchronous = true
//    var result = "unknown"
//    manager.requestImageDataForAsset(asset, options: options, resultHandler: {(imagedata, dataUTI, orientation, info) in
//      if let url = info?["PHImageFileURLKey"] as? NSURL {
//        result = url.absoluteString
//      }
//    })
//    return result
    let identifier = asset.localIdentifier
    let identifier32 = identifier.substringToIndex(identifier.startIndex.advancedBy(32))
    let url = "ph://\(identifier)"
    return url
  }
  
  static func requestImageForAsset(asset:PHAsset)->UIImage {
    let options = PHImageRequestOptions()
    options.synchronous = true
    var image = UIImage()
    manager.requestImageForAsset(asset, targetSize: CGSize(width:asset.pixelWidth, height:asset.pixelHeight), contentMode: .AspectFit, options: options, resultHandler: {(result,info) in
      if let img=result {
        image = img
      }
    })
    return image
  }
  
  static func fetch(after:NSDate)->[Screenshot] {
    let options = PHFetchOptions()
    let ssPredicate =  NSPredicate(format:"mediaSubtype == %ld", PHAssetMediaSubtype.PhotoScreenshot.rawValue)
    
    let datePredicate = NSPredicate(format:"creationDate > %@", after)
    options.predicate = NSCompoundPredicate(type:.AndPredicateType, subpredicates:[ssPredicate, datePredicate])
    let result = PHAsset.fetchAssetsWithMediaType(.Image, options: options)
    print("@@@", result.count)
    var screens = [Screenshot]()
    result.enumerateObjectsUsingBlock{(object, count, stop) in
      if let asset = object as? PHAsset {
        let url = requestUrlForAsset(asset)
        let image = requestImageForAsset(asset)
        screens.append(Screenshot(image:image, url:url))
      }
    }
    return screens
  }
}