import { Constants } from "src/core/constants/constants";
import { SerializeUtils } from "../serialize.utils";
import { UserTokenModel } from "./user-token.model";
import * as jwt from "jsonwebtoken";
export class TokenUtils {

  static generateToken(userModel: UserTokenModel) {
    const obj = SerializeUtils.serializer.serializeObject(userModel);
    const token = jwt.sign(obj, Constants.jwtSecret);
    return token;
  }

  static verifyToken(token: string): UserTokenModel | null {
    try {
      const decoded = jwt.verify(token, Constants.jwtSecret);
      const userModel = SerializeUtils.serializer.deserializeObject(decoded, UserTokenModel);
      if (userModel.expiresAt < new Date().getTime()) return null;
      return userModel;
    } catch (e) {
      return null;
    }
  }

}