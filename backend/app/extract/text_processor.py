import re


def normalize_text(text: str) -> str:
    return (
        text.replace("\r", "")
            .replace("\t", " ")
            .replace("  +", " ")
            .strip()
    )


def fix_hyphenation(text: str) -> str:
    return re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)


def fix_line_breaks(text: str) -> str:
    text = re.sub(r"([a-z,])\n([a-z])", r"\1 \2", text, flags=re.IGNORECASE)
    text = re.sub(r"\n{2,}", "\n\n", text)
    return text


def fix_weird_breaks(text: str) -> str:
    text = re.sub(r"\n(?!\n)", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def to_paragraphs(text: str) -> list[str]:
    paragraphs = []
    for p in text.split("\n\n"):
        p = p.strip()
        if p:
            paragraphs.append(p)
    return paragraphs


def process_text(raw: str) -> list[str]:
    text = normalize_text(raw)
    text = fix_hyphenation(text)
    text = fix_line_breaks(text)
    text = fix_weird_breaks(text)
    return to_paragraphs(text)


def process_page_content(content: str) -> str:
    processed = process_text(content)
    return "\n\n".join(processed)