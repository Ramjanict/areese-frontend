const MessageHeader = () => {
  return (
    <div className="w-full border border-border rounded-2xl bg-brand px-8 py-10 flex flex-col items-center text-center shadow-sm">
      <h1 className="text-2xl font-bold text-text mb-3">
        Communication Templates
      </h1>

      <h2 className="text-base font-bold text-text mb-4">
        Ever get stuck—or forget what to say—professionally?
      </h2>

      <p className="text-sm text-text leading-relaxed max-w-xl mb-5">
        Don't Forget has you covered. These done-for-you communication templates
        help you say it right every time. Just copy, paste, and fill in the
        blanks to add your personal touch for emails, texts, or messages that
        help you sound clear, confident, and professional.
      </p>

      <p className="text-sm font-bold italic text-text">Thank me later.</p>
    </div>
  );
};

export default MessageHeader;
