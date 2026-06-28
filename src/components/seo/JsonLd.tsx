/**
 * Renders a schema.org JSON-LD `<script>`. Server component — emits static
 * markup with no client JS. Pass a single schema object or an array of them.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // Structured data is build-time / server-rendered only.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
