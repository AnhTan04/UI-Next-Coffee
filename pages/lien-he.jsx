import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Spacer,
  Image,
} from "@heroui/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/layouts/Navbar";
import useFeedback from "@/hooks/useFeedback";
import { useRouter } from "next/router";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    content: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { loading, error, subjects, createFeedback, getSubjects, clearError } =
    useFeedback();

  const router = useRouter();

  // Fetch available subjects from API
  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createFeedback(formData);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        content: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
    // Error is handled by the hook and stored in the error state
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Điện thoại",
      content: "0123 456 789",
      subContent: "Hotline hỗ trợ 24/7",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "contact@coffee.com",
      subContent: "Phản hồi trong 24h",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MapPinIcon,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận XYZ",
      subContent: "Hà Nội, Việt Nam",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: ClockIcon,
      title: "Giờ làm việc",
      content: "8:00 - 22:00",
      subContent: "Thứ 2 - Chủ nhật",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white py-12">
              <div className="flex flex-col items-center text-center w-full">
                <div className="p-4 bg-white/20 rounded-full mb-4">
                  <ChatBubbleLeftRightIcon className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Liên Hệ Với Chúng Tôi
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mb-6">
                  Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ
                  với chúng tôi qua các kênh dưới đây.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push('/feedback-cua-toi')}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/30"
                  >
                    Xem feedback của tôi
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardBody className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="font-semibold text-gray-700 mb-1">
                    {info.content}
                  </p>
                  <p className="text-sm text-gray-500">{info.subContent}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <PaperAirplaneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800">
                      Gửi Feedback
                    </h2>
                    <p className="text-blue-600">
                      Điền thông tin và chúng tôi sẽ phản hồi sớm nhất
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-8">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Gửi thành công!
                        </h4>
                        <p className="text-green-600 text-sm">
                          Chúng tôi đã nhận được feedback của bạn và sẽ phản hồi
                          trong thời gian sớm nhất.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-semibold text-red-800">
                          Có lỗi xảy ra
                        </h4>
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Nhập email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Chủ đề *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Chọn chủ đề</option>
                        {subjects.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung feedback *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Nhập nội dung feedback của bạn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full py-4 px-6 rounded-lg font-semibold text-lg
                      flex items-center justify-center gap-3
                      transition-all duration-300 transform
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98]"
                      }
                      text-white shadow-lg hover:shadow-xl
                    `}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        Gửi feedback
                      </>
                    )}
                  </button>
                </form>
              </CardBody>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              {/* Map Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800">
                        Vị Trí Cửa Hàng
                      </h2>
                      <p className="text-green-600">
                        Tìm đường đến cửa hàng của chúng tôi
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="h-64 bg-gray-200 rounded-b-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0967470929!2d105.84117831533216!3d21.028511986010745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardBody>
              </Card>

              {/* FAQ Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-purple-800">
                        Câu Hỏi Thường Gặp
                      </h2>
                      <p className="text-purple-600">
                        Một số thông tin hữu ích
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thời gian giao hàng?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Chúng tôi giao hàng trong vòng 1-2 giờ tại nội thành Hà
                        Nội.
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phí giao hàng?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Miễn phí giao hàng cho đơn hàng từ 200.000đ.
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Chính sách đổi trả?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Đổi trả trong vòng 24h nếu sản phẩm có vấn đề về chất
                        lượng.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <Spacer y={8} />

          {/* Social Media */}
          <Card className="shadow-lg bg-gradient-to-r from-orange-100 to-amber-100">
            <CardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                Kết Nối Với Chúng Tôi
              </h3>
              <p className="text-orange-700 mb-6">
                Theo dõi chúng tôi trên các mạng xã hội để cập nhật tin tức mới
                nhất
              </p>
              <div className="flex justify-center gap-4">
                <Chip
                  as="a"
                  href="#"
                  color="primary"
                  variant="solid"
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:scale-105 transition-transform"
                >
                  Facebook
                </Chip>
                <Chip
                  as="a"
                  href="#"
                  color="secondary"
                  variant="solid"
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:scale-105 transition-transform"
                >
                  Instagram
                </Chip>
                <Chip
                  as="a"
                  href="#"
                  color="success"
                  variant="solid"
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:scale-105 transition-transform"
                >
                  Zalo
                </Chip>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
