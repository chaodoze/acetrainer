//
//  CalendarManagerBridge.m
//  acetrainer
//
//  Created by Chao Lam on 8/30/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date callback: (RCTResponseSenderBlock)callback);

RCT_EXTERN_METHOD(fetchPhotos);

@end