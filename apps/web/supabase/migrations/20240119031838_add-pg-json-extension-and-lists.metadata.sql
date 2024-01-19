create extension if not exists "pg_jsonschema" with schema "extensions";


alter table "public"."profiles" add column "list_order_record" jsonb;


alter table "public"."profiles"
add constraint check_list_order_record check (
  jsonb_matches_schema(
    '{
          "type": "array",
          "items": {
              "type": "object",
              "properties": {
                  "list_uid": {
                      "type": "string"
                  },
                  "order": {
                      "type": "integer"
                  }
              }
          }
      }',
    list_order_record
  )
);