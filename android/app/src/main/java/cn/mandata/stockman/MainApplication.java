package cn.mandata.stockman;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import cn.mandata.react_native_voise.BaiduVoiseLibPackage;

import com.smixx.reactnativeicons.IconFont;
import com.smixx.reactnativeicons.ReactNativeIcons;
import cn.mandata.react_native_mpchart.MPChartPackage;
import cn.mandata.react_native_android_lib.ManDataLibPackage;
import cn.mandata.react_native_voise.BaiduVoiseLibPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import cn.mandata.react_native_mpchart.MPChartPackage;
import cn.mandata.react_native_android_lib.ManDataLibPackage;
import cn.mandata.react_native_voise.BaiduVoiseLibPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import cn.mandata.react_native_mpchart.MPChartPackage;
import cn.mandata.react_native_android_lib.ManDataLibPackage;
import cn.mandata.react_native_voise.BaiduVoiseLibPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import cn.mandata.react_native_mpchart.MPChartPackage;
import cn.mandata.react_native_android_lib.ManDataLibPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ReactNativeIcons(Arrays.asList(
                        new IconFont("typicons", "typicons.ttf"),
                        new IconFont("fontawesome", "FontAwesome.otf")
                )),
                new MPChartPackage(),
                new ManDataLibPackage(),
                new BaiduVoiseLibPackage()
        );
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
