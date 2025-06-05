CREATE TABLE IF NOT EXISTS conversions (
    id SERIAL PRIMARY KEY,
    original_text TEXT    NOT NULL,
    converted_texts JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO conversions (original_text, converted_texts) VALUES
(
    'こんにちは',
    '{
        "kansaiben":   "まいど こんちは",
        "hakataben":   "おっす",
        "tsugaruben":  "やあ"
    }'::jsonb
);