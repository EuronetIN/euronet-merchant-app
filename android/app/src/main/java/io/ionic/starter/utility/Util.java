package io.ionic.starter.utility;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.view.MotionEventCompat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.util.Iterator;


import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.Mac;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;


import io.ionic.starter.MainActivity;

public class Util {
  public static Context currContext;
  private static final int VALID = 0;
  private static int INVALID = 1;
  private final static String LOG_TAG = Util.class.getName();



  private static boolean checkRootMethod1() {
    String var0 = Build.TAGS;
    return var0 != null && var0.contains("test-keys");
  }























  public static JSONObject getEncryptedJson(JSONObject input, String exp, String mod) throws Exception {
    JSONObject encryptedJson = new JSONObject();
    try {
      BigInteger modules = new BigInteger(1, Base64.decode(mod.getBytes("UTF-8"), Base64.DEFAULT));
      BigInteger exponent = new BigInteger(1, Base64.decode(exp.getBytes("UTF-8"), Base64.DEFAULT));

      Iterator<String> itrator = input.keys();
      while (itrator.hasNext()) {
        String key = itrator.next();


        if (input.get(key) instanceof JSONObject) {
          encryptedJson.put(key, getEncryptedJson(input.getJSONObject(key), exp, mod));
        } else {
          if(key.equalsIgnoreCase("fcmtoken") || key.equalsIgnoreCase("token")){
            encryptedJson.put(key, input.getString(key));
          }else {
            encryptedJson.put(key, EncryptString(input.getString(key), modules, exponent));
          }

        }


      }
    } catch (Exception e) {
      // e.printStackTrace();
      throw new Exception(e);
    }

    return encryptedJson;
  }

  @RequiresApi(api = Build.VERSION_CODES.FROYO)
  public static String EncryptString(String input, BigInteger modules, BigInteger exponent) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {


    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1PADDING");
    PublicKey pubKey = KeyFactory.getInstance("RSA")
      .generatePublic(new RSAPublicKeySpec(modules, exponent));
    cipher.init(Cipher.ENCRYPT_MODE, pubKey);
    //String abc= pubKey.toString();

    return Base64.encodeToString(cipher.doFinal(input.getBytes()), Base64.DEFAULT);


  }


  private static boolean checkUsingCommand() {
    Process process = null;
    try {
      process = Runtime.getRuntime().exec(new String[]{"/system/xbin/which", "su"});
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      if (reader.read() != -1) {
        //synclog("---rooted check---", "command execute check fails for", Util.class.getName(), "checkUsingCommand");
        if (process != null) {
          process.destroy();
        }
        return true;
      }
      if (process != null) {
        process.destroy();
      }
      return false;
    } catch (Exception localException) {
//            localObject4 = localObject1;
//            Thread.currentThread().getStackTrace()[2].getMethodName();
      return false;
    } finally {
      Object localObject4;
      if (process != null) {
        process.destroy();
      }
    }
  }

  public static String getDeviceName() {
    StringBuilder var0 = new StringBuilder(Build.BRAND);
    var0.append(" ");
    var0.append(Build.MODEL);
    return var0.toString();
  }

  public static String getOS() {
    return Build.VERSION.RELEASE;
  }

  public static boolean isNetworkAvailable(MainActivity mActivity) {


    NetworkInfo networkInfo = ((ConnectivityManager) mActivity.getSystemService(Context.CONNECTIVITY_SERVICE)).getActiveNetworkInfo();
    return (networkInfo != null) && (networkInfo.isConnected());

  }

  public static boolean isRooted() {
    if (checkRootMethod1()) {
      Logger.log("---rooted check---", "Build TAG is TEST KEY for Device", Util.class.getName(), "checkRootMethod1");
    }

//    boolean var0 = checkUsingApk();
    boolean var0 = false;
    boolean var1 = checkUsingCommand();
    return var0 || var1;
  }

  public static JSONObject getDecryptedJson(JSONObject input, String exp, String mod, String dd) {

    JSONObject encryptedJson = new JSONObject();


    Iterator<String> itrator = input.keys();
    while (itrator.hasNext()) {
      String key = itrator.next();
      try {
        if (input.get(key) instanceof JSONObject) {
          if (key.equalsIgnoreCase("result")) {
            encryptedJson.put(key, decryptResultObject(input.getJSONObject(key), exp, mod, dd));
          } else {
            encryptedJson.put(key, getDecryptedJson(input.getJSONObject(key), exp, mod, dd));
          }
        } else if (input.get(key) instanceof JSONArray) {
          JSONArray jsonArray = input.getJSONArray(key);
          JSONArray decryptedArray = new JSONArray();
          for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject js = jsonArray.getJSONObject(i);
            if (js != null) {
              decryptedArray.put(getDecryptedJson(js, exp, mod, dd));
            }
          }
          encryptedJson.put(key, decryptedArray);
        } else {
          //String encString = EncryptString(input.getString(key), modules, exponent);
          if (key.equalsIgnoreCase("mod")
            || key.equalsIgnoreCase("isSuccessful") || key.equalsIgnoreCase("exp")) {
            encryptedJson.put(key, input.getString(key));
          } else if (key.equalsIgnoreCase("isAlreadyRegisteredUser")) {
            if (input.getString(key).equalsIgnoreCase("true") || input.getString(key).equalsIgnoreCase("false")) {
              encryptedJson.put(key, input.getString(key));
            } else {
              encryptedJson.put(key, decryptData(input.getString(key), mod, exp, dd));
            }
          } else {
            encryptedJson.put(key, decryptData(input.getString(key), mod, exp, dd));
          }
        }
      } catch (Exception e) {
        Logger.onlyLog("DECRYPTED_ERROR : " + e.getMessage());
      }

    }


    return encryptedJson;
  }

  public static String decryptData(String encryptedString, String mod, String exp, String dd) throws InvalidKeySpecException, NoSuchAlgorithmException, IOException {

    BigInteger modules = new BigInteger(1, Base64.decode(mod.getBytes("UTF-8"), Base64.DEFAULT));
    BigInteger exponent = new BigInteger(1, Base64.decode(exp.getBytes("UTF-8"), Base64.DEFAULT));
    BigInteger d = new BigInteger(1, Base64.decode(dd.getBytes("UTF-8"), Base64.DEFAULT));

    PrivateKey privateKey = KeyFactory.getInstance("RSA")
      .generatePrivate(new RSAPrivateKeySpec(modules, d));

    CryptLib cryptLib = new CryptLib();
    String decryptDataString = cryptLib.decryptData(encryptedString,
      privateKey);

    return decryptDataString;
  }

  public static JSONObject decryptResultObject(JSONObject input, String exp, String mod, String dd) {
    JSONObject edecResultJson = new JSONObject();
    Iterator<String> itrator = input.keys();
    while (itrator.hasNext()) {
      String key = itrator.next();
      try {
        if (key.equalsIgnoreCase("message")) {
          edecResultJson.put(key, decryptData(input.getString(key), mod, exp, dd));
        } else {
          edecResultJson.put(key, input.getString(key));
        }

      } catch (Exception e) {
        Logger.onlyLog(e.getMessage());
      }

    }


    return edecResultJson;

  }


//  public static JSONObject getEncryptedJson(JSONObject input, String exp, String mod) throws Exception {
//    JSONObject encryptedJson = new JSONObject();
//    try {
//      BigInteger modules = new BigInteger(1, Base64.decode(mod.getBytes("UTF-8"), Base64.DEFAULT));
//      BigInteger exponent = new BigInteger(1, Base64.decode(exp.getBytes("UTF-8"), Base64.DEFAULT));
//
//      Iterator<String> itrator = input.keys();
//      while (itrator.hasNext()) {
//        String key = itrator.next();
//
//
//        if (input.get(key) instanceof JSONObject) {
//          encryptedJson.put(key, getEncryptedJson(input.getJSONObject(key), exp, mod));
//        } else {
//          if(key.equalsIgnoreCase("fcmtoken")){
//            encryptedJson.put(key, input.getString(key));
//          }else {
//            encryptedJson.put(key, EncryptString(input.getString(key), modules, exponent));
//          }
//
//        }
//
//
//      }
//    } catch (Exception e) {
//     // e.printStackTrace();
//      throw new Exception(e);
//    }
//
//    return encryptedJson;
//  }


//  public static String EncryptString(String input, BigInteger modules, BigInteger exponent) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
//
//
//    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1PADDING");
//    PublicKey pubKey = KeyFactory.getInstance("RSA")
//      .generatePublic(new RSAPublicKeySpec(modules, exponent));
//    cipher.init(Cipher.ENCRYPT_MODE, pubKey);
//    //String abc= pubKey.toString();
//
//    return Base64.encodeToString(cipher.doFinal(input.getBytes()), Base64.DEFAULT);
//
//
//  }


  public static byte[] hexStringToByteArray(String s) {
    byte[] b = new byte[s.length() / 2];
    for (int i = 0; i < b.length; ++i) {
      int index = i * 2;
      int v = Integer.parseInt(s.substring(index, index + 2), 16);
      b[i] = (byte) v;
    }
    return b;
  }


  public static String toHexString(byte[] data) {
    StringBuffer buf = new StringBuffer();
    for (byte b : data) {

      String s = Integer.toHexString(b & MotionEventCompat.ACTION_MASK);
      if (s.length() == 1) {
        s = "0" + s;
      }
      buf.append(s);
    }
    return buf.toString();
  }
  public static String populateHMAC(String app_id, String mobile, String token, String deviceId, String random) {
    String hmac = null;
    try {
      CryptLib cryptLib = new CryptLib();
      String message = app_id + "|" + mobile + "|" + deviceId;
      Log.e("UTIL", "PSP Hmac Msg - " + message);
      byte[] hmacBytes = cryptLib.aesEncrypt(
        cryptLib.sha256Bytes(message, random),
        hexStringToByteArray(token),
        random);
      hmac = Base64.encodeToString(hmacBytes, Base64.DEFAULT);
    } catch (Exception e) {
      Log.e("UTIL", "populateHMAC ", e);
    }
    return hmac;
  }




  static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  static SecureRandom rnd = new SecureRandom();


  public static String randomString(int len) {
    String base64 = "";
    try {
      StringBuilder sb = new StringBuilder(len);
      for (int i = 0; i < len; i++)
        sb.append(AB.charAt(rnd.nextInt(AB.length())));


      byte[] data = sb.toString().getBytes("UTF-8");
      base64 = Base64.encodeToString(data, Base64.DEFAULT);
    } catch (UnsupportedEncodingException e) {
      //e.printStackTrace();
    }
    return base64;

  }


  public static String encryptDataAes(String text, String hexPassword) {
    byte[] originalBytes = hexStringToByteArray(convertToHex(text));
    byte[] passwordBytes = hexStringToByteArray(hexPassword);
    byte[] encryptedBytes = null;

    try {
      KeySpec secretKey = new SecretKeySpec(passwordBytes, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/ZeroBytePadding");
      cipher.init(Cipher.ENCRYPT_MODE, (Key) secretKey);

      encryptedBytes = cipher.doFinal(originalBytes);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return convertByteToHexadecimal(encryptedBytes);
  }

  public static String convertToHex(String text) {
    StringBuilder result = new StringBuilder();

    for (char c : text.toCharArray()) {
      result.append(String.format("%02X", (int) c));
    }

    return result.toString();
  }

  private static String convertByteToHexadecimal(byte[] byteArray) {
    String hex = "";

    // Iterating through each byte in the array
    for (byte i : byteArray) {
      hex += String.format("%02X", i);
    }

    return hex;
  }

  public static String decryptDataAes(String text, String hexPassword) {
    byte[] originalBytes = hexStringToByteArray(text);
    byte[] passwordBytes = hexStringToByteArray(hexPassword);
    byte[] decryptedBytes = null;

    try {
      SecretKeySpec secretKey = new SecretKeySpec(passwordBytes, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
      cipher.init(Cipher.DECRYPT_MODE, secretKey);

      decryptedBytes = cipher.doFinal(originalBytes);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return new String(decryptedBytes, StandardCharsets.UTF_8).trim();
  }

  public static String hmc(String jsom, String token) throws NoSuchAlgorithmException, InvalidKeyException {


   // String token = "6DD601D4C58B2D8B757EBD7C24FFF545"; // publick key
    boolean iscorrect6 = false;
    byte[] secrteKey = token.getBytes();
    String key = Base64.encodeToString(secrteKey, Base64.NO_WRAP);
    SecretKeySpec signedKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(signedKey);

    byte[] bytes = jsom.getBytes();

    byte[] rawHmac = mac.doFinal(bytes);
    byte[] checkSum = Base64.encode(rawHmac, Base64.NO_WRAP);

    String checksumString = Base64.encodeToString(rawHmac, Base64.NO_WRAP);
    return checksumString;
  }

}
