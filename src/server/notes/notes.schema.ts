const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    content: { type: "string", maxLength: 250 },
    category: { type: "string" },
    created: { type: "Date" },
    dates: {type: []},
    archive: {type: false}
  },
  required: ["name", "content", "category"],
  additionalProperties: false,
};

export default schema;
