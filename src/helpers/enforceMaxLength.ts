export const enforceMaxLength: (e: any) => void = (e) => {
  if (e.target.value.length === e.target.maxLength) {
    e.preventDefault();
  }
};
