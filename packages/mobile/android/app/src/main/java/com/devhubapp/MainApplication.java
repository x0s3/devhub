package com.devhubapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.oblador.vectoricons.VectorIconsModule;

import org.devio.rn.splashscreen.SplashScreenModule;

import com.proyecto26.inappbrowser.RNInAppBrowserModule;
import com.swmansion.rnscreens.RNScreensPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new TurboReactPackage() {
                        @Override
                        public NativeModule getModule(String name, ReactApplicationContext reactContext) {
                            switch (name) {
                                case "RNVectorIconsModule":
                                    return new VectorIconsModule(reactContext);
                                case "SplashScreen":
                                    return new SplashScreenModule(reactContext);
                                case "RNInAppBrowser":
                                    return new RNInAppBrowserModule(reactContext);
                                default:
                                    throw new IllegalArgumentException("Could not fin module " + name);
                            }
                        }

                        @Override
                        public ReactModuleInfoProvider getReactModuleInfoProvider() {
                            return () -> {
                                Map<String, ReactModuleInfo> map = new HashMap<>();
                                map.put("RNVectorIconsModule", new ReactModuleInfo("RNVectorIconsModule", "com.oblador.vectoricons.VectorIconsModule", false, false, true, false, false));
                                map.put("SplashScreen", new ReactModuleInfo("SplashScreen", "org.devio.rn.splashscreen.SplashScreenModule", false, false, true, false, false));
                                map.put("RNInAppBrowser", new ReactModuleInfo("RNInAppBrowser", "com.proyecto26.inappbrowser.RNInAppBrowserModule", false, false, true, false, false));
                                return map;
                            };
                        }
                    },
                    new MainReactPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(),
                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new RNScreensPackage(),
                    new LinearGradientPackage(),
                    new RNGestureHandlerPackage(),
                    BugsnagReactNative.getPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "packages/mobile/index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
