import { StringRewriter } from "./StringRewriter";

export class UrlConverter
{
  convertToUrl(str: string): string {
      let url = str.replace(/[.,:;?!-%@#^&*()<>?,./=_+`~\\|'"\s]+/g, '-');
      url = url.toLowerCase();
      url = StringRewriter.changeRussianToEngilshTranslirization(url);
      
      return url;
    }
}