import unidecode from "unidecode"
export const convertToSlug = (text: String): String => {
    const unidecodeText = unidecode(text).trim();
    const slug:String = unidecodeText.replace(/\s+/g,"-");
    return slug;
}