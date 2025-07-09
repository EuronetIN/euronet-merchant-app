package io.ionic.starter.utility;

import android.util.Base64;
import android.util.Log;

import java.security.MessageDigest;
import java.security.PrivateKey;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptLib {

  private final static String LOG_TAG = CryptLib.class.getName();
  public static byte[] sha256Bytes(String s,String random) {
    try{
      byte[] randomBytes= Base64.decode(random,Base64.NO_WRAP);
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      digest.update(randomBytes);
      return digest.digest(s.getBytes("UTF-8"));
    } catch(Exception ex){
      Log.d(LOG_TAG, "Error generating hash ", ex);
    }
    return null;
  }
  public static byte[] aesEncrypt(final byte[] array, final byte[] array2,String
    random) throws Exception {
    final SecretKeySpec secretKeySpec = new SecretKeySpec(array2, "AES");
    final IvParameterSpec ivParameterSpec = new
      IvParameterSpec(Base64.decode(random,Base64.NO_WRAP));
    final Cipher instance = Cipher.getInstance("AES/GCM/NoPadding");
    instance.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
    return instance.doFinal(array);
  }

  public String decryptData(String encryptedData, PrivateKey privateKey){

    try {
      byte[] encryptedDataBytes = Base64.decode(encryptedData, Base64.NO_WRAP);

      Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
      // Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithMD5AndMGF1Padding"); // for VAPT
      cipher.init(Cipher.DECRYPT_MODE, privateKey);
      byte[] decryptedData = cipher.doFinal(encryptedDataBytes);
      String palinTextDecryptedData = new String(decryptedData);

      return palinTextDecryptedData;
    } catch (Exception e) {
      Logger.onlyLog(e.getMessage());
      return null;
    }
  }

}
