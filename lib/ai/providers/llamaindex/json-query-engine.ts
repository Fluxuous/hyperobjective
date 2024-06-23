export const defaultJsonQueryPrompt = (schema: object, query: string) => {
  return `Answer the user query.

The output should be formatted as a JSON instance that conforms to the JSON schema below. Response must be formatted as a JSON object that matches the schema.
Do not provide syntax highlighting or any additional commentatry.

As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

Here is the output schema:

${JSON.stringify(schema)}

${query}`
}

export const defaultJsonPathPrompt = ({
  query,
  schema,
}: {
  query: string
  schema: string
}) => `
We have provided a JSON schema below:
${schema}
Given a task, respond with a JSON Path query that can retrieve data from a JSON value that matches the schema.
Task: ${query}
JSONPath: 
`

export type JSONPathPrompt = typeof defaultJsonPathPrompt
