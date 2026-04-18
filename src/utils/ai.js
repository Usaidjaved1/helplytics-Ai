export const getCategory = (text) => {
  text = text.toLowerCase();

  if (text.includes("react") || text.includes("javascript") || text.includes("code")) {
    return "Programming";
  }

  if (text.includes("math") || text.includes("algebra")) {
    return "Mathematics";
  }

  if (text.includes("english") || text.includes("essay")) {
    return "English";
  }

  return "General";
};

export const getUrgency = (text) => {
  text = text.toLowerCase();

  if (text.includes("urgent") || text.includes("asap") || text.includes("quick")) {
    return "High";
  }

  return "Normal";
};

export const getTags = (text) => {
  const tags = [];

  if (text.includes("react")) tags.push("React");
  if (text.includes("firebase")) tags.push("Firebase");
  if (text.includes("homework")) tags.push("Homework");
  if (text.includes("help")) tags.push("Help");

  return tags;
};