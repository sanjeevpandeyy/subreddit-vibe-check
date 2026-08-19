function ErrorMessage({ message }) {
  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
      <div className="flex items-start gap-3">
        <span className="text-red-400">!</span>

        <div>
          <h3 className="font-semibold text-red-300">
            Something went wrong
          </h3>

          <p className="mt-1 text-sm text-red-200/60">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;