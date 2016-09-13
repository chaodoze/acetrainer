//
//  PokemonImagerBridge.m
//  acetrainer
//
//  Created by Chao Lam on 8/30/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(PokemonImager, NSObject)

RCT_EXTERN_METHOD(scan:(nonnull NSNumber *)date);
@end