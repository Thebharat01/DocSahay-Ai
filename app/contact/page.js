export default function ContactUs() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Contact Us
        </h1>

        <p className="mb-8 text-gray-600">
          We’re here to help. If you have any questions, feedback, or need
          assistance with DocSahay-AI, please feel free to contact us.
        </p>

        <div className="space-y-7 text-gray-700 leading-7">

          {/* Email */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Email Support
            </h2>

            <p>
              For any questions related to our services, payments, document
              processing, technical issues, or refunds, you can contact us
              by email.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-5">
              <p className="font-medium text-gray-900">
                Email:
              </p>

              <a
                href="mailto:info.thebharatfeed@gmail.com"
                className="mt-1 inline-block text-blue-600 hover:underline"
              >
                info.thebharatfeed@gmail.com
              </a>
            </div>
          </section>

          {/* Support Topics */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              How Can We Help?
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Questions about DocSahay-AI services</li>
              <li>Document upload or processing issues</li>
              <li>Payment and transaction-related queries</li>
              <li>Refund and cancellation requests</li>
              <li>Technical problems</li>
              <li>General feedback and suggestions</li>
            </ul>
          </section>

          {/* Payment Support */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Payment Support
            </h2>

            <p>
              If your payment was deducted but the service was not activated,
              please contact us with your transaction details.
            </p>

            <p className="mt-3">
              For faster assistance, please include the transaction ID,
              payment date, amount paid, and a brief description of the issue.
            </p>
          </section>

          {/* Refund */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Refund & Cancellation
            </h2>

            <p>
              For refund or cancellation-related queries, please review our
              Refund & Cancellation Policy and contact us by email if you
              need further assistance.
            </p>

            <a
              href="/refund-cancellation"
              className="mt-3 inline-block font-medium text-blue-600 hover:underline"
            >
              View Refund & Cancellation Policy →
            </a>
          </section>

          {/* Terms */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Terms & Conditions
            </h2>

            <p>
              Please review our Terms & Conditions for information regarding
              the use of DocSahay-AI services.
            </p>

            <a
              href="/terms-and-conditions"
              className="mt-3 inline-block font-medium text-blue-600 hover:underline"
            >
              View Terms & Conditions →
            </a>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Privacy & Data
            </h2>

            <p>
              Information about how we handle user information and uploaded
              documents is available in our Privacy Policy.
            </p>

            <a
              href="/privacy-policy"
              className="mt-3 inline-block font-medium text-blue-600 hover:underline"
            >
              View Privacy Policy →
            </a>
          </section>

          {/* Response Time */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Response Time
            </h2>

            <p>
              We aim to respond to customer inquiries as soon as reasonably
              possible. Response time may vary depending on the nature and
              volume of requests.
            </p>
          </section>

          {/* Contact Card */}
          <div className="mt-8 rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Get in Touch
            </h2>

            <p className="mb-4 text-gray-700">
              Have a question or need assistance? Send us an email and our
              support team will get back to you.
            </p>

            <a
              href="mailto:info.thebharatfeed@gmail.com"
              className="inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Email Us
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
