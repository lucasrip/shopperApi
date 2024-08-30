import ApiError from "./apiError";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

class gemini 
{
 private geminiKey:string = process.env.GEMINI_API_KEY as string;

 async makeImageValidade(name:string,mimeType:string)
 {
  this.geminiKey === "" && new ApiError(400,{
    message:'é necessario uma key do gemini para usar este serviço', 
    link:'https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br',
    doc:'https://ai.google.dev/gemini-api/docs/vision?hl=pt-br&lang=node',
  })

const genAI = new GoogleGenerativeAI(this.geminiKey);
 const fileManager = new GoogleAIFileManager(this.geminiKey);
 const uploadResponse = await fileManager.uploadFile(name, {
  mimeType,
 });

 const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const resultValidade = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: `Tell me what the numerical value of the meter is. 
    This value must be an integer and between two value tags, 
    for example <value>result <value>` 
  },
  
]);



const meterValue = resultValidade?.response?.candidates?.map(item=> item.content.parts.map(item=> item.text?.replace(/<\/?value>/g, '')))[0][0]

const result = {
 value:Number(meterValue),
 uri:uploadResponse.file.uri
}
 return result
 }


}

export default new gemini();