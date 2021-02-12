export default function IsJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}