export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">
              DocSahay-AI
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              AI-Powered Document Assistance
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm">

            <a
              href="/privacy-policy"
              className="text-gray-300 hover:text-white hover:underline"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-and-conditions"
              className="text-gray-300 hover:text-white hover:underline"
            >
              Terms & Conditions
            </a>

            <a
              href="/refund-cancellation"
              className="text-gray-300 hover:text-white hover:underline"
            >
              Refund & Cancellation
            </a>

            <a
              href="/contact"
              className="text-gray-300 hover:text-white hover:underline"
            >
              Contact Us
            </a>

          </div>

        </div>

        {/* Email */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Support:{" "}
          <a
            href="mailto:info.thebharatfeed@gmail.com"
            className="text-gray-300 hover:text-white hover:underline"
          >
            info.thebharatfeed@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} DocSahay-AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
