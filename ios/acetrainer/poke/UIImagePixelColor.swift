//
//  UIImagePixelColor.swift
//  tessTest
//
//  Created by Chao Lam on 9/6/16.
//  Copyright © 2016 Next Small Things. All rights reserved.
//

import UIKit

extension UIImage {
  public subscript (x: Int, y: Int) -> (red:Int, green:Int, blue:Int)? {
    
    if x < 0 || x > Int(size.width) || y < 0 || y > Int(size.height) {
      return nil
    }
    
    let provider = CGImageGetDataProvider(self.CGImage)
    let providerData = CGDataProviderCopyData(provider)
    let data = CFDataGetBytePtr(providerData)
    
    let numberOfComponents = 4
    let pixelData = ((Int(size.width) * y) + x) * numberOfComponents
    return (red:Int(data[pixelData]), green:Int(data[pixelData+1]), blue:Int(data[pixelData+2]))
    //
    //        let r = CGFloat(data[pixelData]) / 255.0
    //        let g = CGFloat(data[pixelData + 1]) / 255.0
    //        let b = CGFloat(data[pixelData + 2]) / 255.0
    //        let a = CGFloat(data[pixelData + 3]) / 255.0
    //
    //        return UIColor(red: r, green: g, blue: b, alpha: a)
  }
  
}