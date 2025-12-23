import LegalLayout from "../components/LegalLayout";

export default function ContactUs() {
  return (
    <LegalLayout title="Contact Us">
      <p>If you have any questions about our tools, data accuracy, or potential partnerships, please feel free to reach out to us.</p>
      
      <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 mt-8">
        <h4 className="mt-0">General Inquiries</h4>
        <p>Email: <strong>contact@takaincome.com</strong></p>
        
        <h4>Office Address</h4>
        <p>Dhaka, Bangladesh</p>
      </div>

      <p className="mt-8 text-sm italic">Note: We aim to respond to all legitimate inquiries within 48 business hours.</p>
    </LegalLayout>
  );
}
