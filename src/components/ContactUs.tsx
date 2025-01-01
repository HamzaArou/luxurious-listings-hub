import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="py-12 bg-darkBlue text-white">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-4xl font-bold text-center mb-8">اتصل بنا</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-gold"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gold text-darkBlue font-bold rounded hover:bg-opacity-90 transition-colors"
              >
                إرسال
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-bold">اتصل بنا</h3>
                <p className="text-white/80">0505148231</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-bold">راسلنا</h3>
                <p className="text-white/80">info@alfaisal.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-bold">موقعنا</h3>
                <p className="text-white/80">الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
            <div className="h-48 w-full rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674754182463!2d46.6752!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzAuNyJF!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;