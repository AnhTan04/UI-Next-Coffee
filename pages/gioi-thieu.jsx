import React from 'react';
import MasterLayout from '../components/layouts/MasterLayout';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
  Image,
  Progress,
  Avatar
} from "@heroui/react";
import { motion } from "framer-motion";

const GioiThieu = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const processSteps = [
    {
      title: "Thu hoạch",
      description: "Những trái cà phê chín được hái thủ công từ các nông trại và được nhập về tại xưởng của Roastory",
      icon: "🌱"
    },
    {
      title: "Sơ chế và phơi khô",
      description: "Trái cà phê được xử lý (ướt hoặc khô) để tách hạt, sau đó phơi khô tự nhiên đến độ ẩm tiêu chuẩn",
      icon: "☀️"
    },
    {
      title: "Xay xát và phân loại",
      description: "Hạt cà phê thô được đưa vào máy xay để loại bỏ lớp vỏ khô, rồi phân loại theo kích cỡ và chất lượng.",
      icon: "⚙️"
    },
    {
      title: "Rang cà phê",
      description: "Hạt cà phê được rang tại nhà máy Roastory với quy trình kiểm soát nhiệt độ nghiêm ngặt, đảm bảo hương vị đồng nhất.",
      icon: "🔥"
    },
    {
      title: "Đóng gói",
      description: "Cà phê rang được đóng gói ngay lập tức trong bao bì chuyên dụng để bảo vệ hương thơm và chất lượng.",
      icon: "📦"
    },
    {
      title: "Lưu kho",
      description: "Sản phẩm được bảo quản tại kho của Roastory, ở môi trường khô ráo, nhiệt độ ổn định.",
      icon: "🏪"
    },
    {
      title: "Vận chuyển",
      description: "Cà phê được vận chuyển bằng xe chuyên dụng đến các đại lý, nhà phân phối, hoặc trực tiếp đến cửa hàng của khách hàng.",
      icon: "🚚"
    },
    {
      title: "Giao hàng và hỗ trợ",
      description: "Cà phê được vận chuyển bằng xe chuyên dụng đến các đại lý, nhà phân phối, hoặc trực tiếp đến các doanh nghiệp, chuỗi cửa hàng của khách hàng.",
      icon: "🤝"
    }
  ];

  const commitments = [
    "Cà phê nguyên chất 100%, không phụ gia, không tẩm ướp.",
    "Rang xay theo yêu cầu, phù hợp với từng loại máy pha chế.",
    "Hỗ trợ kỹ thuật pha chế và giao hàng nhanh chóng.",
    "Giải pháp trọn gói cho văn phòng, nhà hàng, quán cà phê."
  ];

  const shippingMethods = [
    "Vận chuyển đường bộ",
    "Vận chuyển bằng dịch vụ giao nhận chuyên nghiệp",
    "Vận chuyển bằng xe máy",
    "Vận chuyển sử dụng dịch vụ chuyển phát nhanh"
  ];

  return (
    <MasterLayout>
      <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
        {/* Hero Section */}
        <motion.section 
          className="py-20 bg-gradient-to-br from-amber-900 to-amber-800 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
                Giới thiệu về Roastory Coffee
              </h1>
              <Divider className="max-w-24 mx-auto bg-amber-300 mb-8" />
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Thương hiệu cà phê được xây dựng từ đam mê và sự tinh tế trong từng hạt cà phê
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Introduction Section */}
        <motion.section 
          className="py-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Card className="max-w-6xl mx-auto shadow-xl border-0">
                <CardBody className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-amber-900 mb-6">
                        Về Roastory Coffee
                      </h2>
                      <p className="text-lg leading-relaxed text-gray-700 mb-6">
                        <strong>Roastory Coffee</strong> là thương hiệu cà phê được xây dựng từ đam mê và sự tinh tế trong từng hạt cà phê. 
                        Chúng tôi chuyên cung cấp các sản phẩm cà phê chất lượng cao dành riêng cho các doanh nghiệp, đối tác F&B, văn phòng và hệ thống chuỗi.
                      </p>
                      <p className="text-lg leading-relaxed text-gray-700 mb-6">
                        Nguồn nguyên liệu cà phê được lựa chọn kỹ lưỡng từ các vùng trồng cà phê nổi tiếng như <strong>Đắk Lắk, Lâm Đồng, Gia Lai</strong>.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Chip color="warning" variant="flat">Đắk Lắk</Chip>
                        <Chip color="warning" variant="flat">Lâm Đồng</Chip>
                        <Chip color="warning" variant="flat">Gia Lai</Chip>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=400&fit=crop"
                        alt="Coffee plantation"
                        className="rounded-2xl shadow-lg"
                        width={500}
                        height={400}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12">
              <Card className="max-w-6xl mx-auto shadow-xl border-0">
                <CardBody className="p-8 md:p-12">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    Với sứ mệnh nâng cao giá trị hạt cà phê Việt, chúng tôi chú trọng xây dựng chuỗi cung ứng bền vững từ nông trại đến ly cà phê. 
                    <strong> Roastory Coffee</strong> không chỉ mang đến sản phẩm cà phê chất lượng cao mà còn cung cấp các giải pháp toàn diện.
                  </p>
                  
                  <Card className="bg-gradient-to-r from-amber-100 to-amber-50 border-l-4 border-amber-600 mb-6">
                    <CardBody className="p-6">
                      <p className="text-amber-900 font-semibold italic text-lg">
                        "Sứ mệnh của chúng tôi là mang đến trải nghiệm cà phê chất lượng - nguyên bản - tinh tế cho cộng đồng doanh nghiệp."
                      </p>
                    </CardBody>
                  </Card>

                  <p className="text-lg leading-relaxed text-gray-700">
                    Ngoài ra, chúng tôi cung cấp các dịch vụ như phân phối cà phê hạt rang, cà phê bột, cà phê đóng gói theo thương hiệu riêng (OEM), 
                    tư vấn và thiết kế menu cho các quán cà phê, nhà hàng, khách sạn. <strong>Roastory Coffee</strong> cam kết đồng hành cùng đối tác 
                    trong việc xây dựng thương hiệu cà phê riêng biệt.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Commitments Section */}
        <motion.section 
          className="py-20 bg-gradient-to-br from-amber-900 to-amber-800 text-white"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Cam kết của chúng tôi
              </h2>
              <Divider className="max-w-24 mx-auto bg-amber-300" />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {commitments.map((commitment, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardBody className="p-6 flex items-center gap-4">
                      <div className="bg-amber-300 p-2 rounded-full flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white">{commitment}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Process Timeline Section */}
        <motion.section 
          className="py-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
                Quy trình sản xuất
              </h2>
              <Divider className="max-w-24 mx-auto bg-amber-600 mb-4" />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Các công đoạn từ sản xuất cho đến khi vận chuyển đến tay người tiêu dùng
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="max-w-4xl mx-auto">
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="relative mb-8"
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardBody className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0">
                            <Avatar 
                              className="bg-amber-100 text-amber-900 text-2xl"
                              size="lg"
                              name={step.icon}
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="text-xl font-bold text-amber-900 uppercase">
                                {step.title}
                              </h3>
                              <Chip color="warning" variant="flat" size="sm">
                                Bước {index + 1}
                              </Chip>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    {index < processSteps.length - 1 && (
                      <div className="flex justify-center my-4">
                        <div className="w-px h-8 bg-amber-300"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Summary Section */}
        <motion.section 
          className="py-20 bg-gradient-to-b from-amber-50 to-white"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Card className="max-w-4xl mx-auto shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                  <h3 className="text-2xl font-bold text-center w-full">
                    Tóm tắt về Roastory Coffee
                  </h3>
                </CardHeader>
                <CardBody className="p-8 md:p-12 text-center">
                  <p className="text-xl leading-relaxed text-gray-700">
                    Roastory Coffee là công ty chuyên cung cấp giải pháp cà phê trọn gói cho doanh nghiệp, 
                    mang đến sản phẩm chất lượng cao, dịch vụ linh hoạt và trải nghiệm cà phê đẳng cấp tại nơi làm việc.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Footer Section */}
        <motion.section 
          className="py-20 bg-gradient-to-br from-blue-100 to-blue-200"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-amber-600 text-white">
                    <h3 className="font-bold uppercase text-center w-full">
                      Công ty vận chuyển cà phê Roastory
                    </h3>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Địa chỉ:</strong> 274 Nguyễn Tri Phương, Quận 10, TP Hồ Chí Minh
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Điện thoại:</strong> 0902639757
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-bold text-amber-900 mb-2">Vị Trí</h4>
                        <div className="rounded-lg overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.376125845827!2d106.68087508885498!3d10.782477500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1d357ad38d%3A0x45778df1f429125b!2sSaigon%20Coffee%20Roastery!5e0!3m2!1svi!2s!4v1746518715972!5m2!1svi!2s"
                            width="100%"
                            height="200"
                            style={{ border: '0' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Contact Info */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-amber-600 text-white">
                    <h3 className="font-bold uppercase text-center w-full">
                      Thông tin liên hệ
                    </h3>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700">
                          274 Nguyễn Tri Phương, Quận 10, TP Hồ Chí Minh
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700">
                          roastorycoffee@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Logo */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-amber-600 text-white">
                    <h3 className="font-bold uppercase text-center w-full">Logo</h3>
                  </CardHeader>
                  <CardBody className="p-6 flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                      <Image
                        src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-1d44-61f7-8e6b-74525073681f/raw?se=2025-05-06T12%3A05%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=7673bab4-ccf4-53d5-97da-483312ff9902&skoid=d958ec58-d47c-4d2f-a9f2-7f3e03fdcf72&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T03%3A13%3A43Z&ske=2025-05-07T03%3A13%3A43Z&sks=b&skv=2024-08-04&sig=1LsOLtlPAOFX77Cw9tHFWxj2EiT0o07ZfDha8VOpAdk%3D"
                        alt="Roastory Coffee Logo"
                        width={150}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Shipping Methods */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-amber-600 text-white">
                    <h3 className="font-bold uppercase text-center w-full">
                      Các loại vận chuyển
                    </h3>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="space-y-3">
                      {shippingMethods.map((method, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="bg-amber-100 p-1 rounded-full">
                            <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-700">{method}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </MasterLayout>
  );
};

export default GioiThieu;