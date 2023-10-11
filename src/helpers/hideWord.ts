export const hideWord = (word: string) => {
  if (word.length < 11) return word;
  return (
    word.substring(0, 7) +
    ".".repeat(word.length - 10) +
    word.substring(word.length - 8, word.length)
  );
};

export const truncateString = (textString: string, num: number) => {
  if (!textString) {
    return "N/A";
  }
  if (textString.length <= num) {
    return textString;
  }
  return textString.slice(0, num) + "...";
};
