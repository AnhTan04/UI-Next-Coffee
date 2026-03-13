import MasterLayout from "@/components/layouts/MasterLayout";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
  Image,
} from "@heroui/react";
import { motion } from "framer-motion";


export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <MasterLayout>
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
              Roastory Coffee
            </h1>
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              <Chip color="warning" variant="flat" size="lg">
                Chất lượng
              </Chip>
              <Chip color="warning" variant="flat" size="lg">
                Nhanh
              </Chip>
              <Chip color="warning" variant="flat" size="lg">
                Tiết kiệm thời gian
              </Chip>
            </div>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Đối tác tin cậy cho giải pháp cà phê doanh nghiệp
            </p>
            <Button
              size="lg"
              color="warning"
              variant="solid"
              className="text-lg px-8 py-6 font-semibold"
              as="a"
              href="/product"
            >
              Khám phá sản phẩm
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-amber-50 to-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Về Roastory Coffee
            </h2>
            <Divider className="max-w-24 mx-auto bg-amber-600" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="max-w-6xl mx-auto shadow-xl border-0">
              <CardBody className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-lg leading-relaxed text-gray-700 mb-6">
                      Ra đời với sứ mệnh nâng tầm trải nghiệm cà phê dành riêng
                      cho doanh nghiệp. Chúng tôi không chỉ mang đến những dòng
                      cà phê chất lượng cao được chọn lọc kỹ lưỡng, mà còn đồng
                      hành cùng các doanh nghiệp xây dựng không gian cà phê
                      chuyên nghiệp.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 mb-6">
                      Với quy trình rang xay hiện đại, đội ngũ chuyên gia giàu
                      kinh nghiệm và cam kết sử dụng nguồn nguyên liệu bền vững,
                      Roastory tự hào mang đến giải pháp cà phê trọn gói.
                    </p>
                    <Card className="bg-amber-100 border-l-4 border-amber-600">
                      <CardBody className="p-6">
                        <p className="text-amber-900 font-semibold italic">
                          "Tại Roastory, mỗi hạt cà phê là một câu chuyện về sự
                          tận tâm, đam mê và trách nhiệm với cộng đồng yêu cà
                          phê."
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="https://www.cubes-asia.com/storage/blogs/2023/cafe-americano.jpg"
                      alt="Roastory Coffee"
                      className="rounded-2xl shadow-lg"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
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
              Sứ mệnh của Roastory
            </h2>
            <Divider className="max-w-24 mx-auto bg-amber-300" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="max-w-5xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
              <CardBody className="p-8 md:p-12 text-center">
                <p className="text-xl leading-relaxed mb-8">
                  Roastory cam kết trở thành đối tác tin cậy đồng hành cùng các
                  doanh nghiệp trong hành trình xây dựng môi trường làm việc
                  tràn đầy cảm hứng.
                </p>
                <p className="text-xl leading-relaxed mb-8">
                  Chúng tôi mang đến những giải pháp cà phê chất lượng cao, được
                  chế biến với sự tận tâm và sáng tạo, nhằm nâng tầm trải nghiệm
                  thưởng thức cà phê ngay tại văn phòng.
                </p>
                <p className="text-xl leading-relaxed">
                  Bằng việc không ngừng đổi mới và đề cao giá trị bền vững,
                  Roastory mong muốn lan tỏa niềm đam mê cà phê Việt đến cộng
                  đồng doanh nghiệp trong và ngoài nước.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-white to-amber-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Liên hệ với chúng tôi
            </h2>
            <Divider className="max-w-24 mx-auto bg-amber-600" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <h3 className="text-2xl font-bold text-center w-full">
          Roastory Coffee
                </h3>
              </CardHeader>
              <CardBody className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">
                          Địa chỉ
                        </h4>
                        <p className="text-gray-700">
                          274 Nguyễn Tri Phương, Quận 10, TP Hồ Chí Minh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">
                          Điện thoại
                        </h4>
                        <p className="text-gray-700">(028) 123 456 789</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">
                          Email
                        </h4>
                        <p className="text-gray-700">contact@roastory.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                      <CardBody className="p-6 text-center">
                        <h4 className="text-xl font-bold text-amber-900 mb-4">
                          Sẵn sàng hợp tác?
                        </h4>
                        <p className="text-gray-700 mb-6">
                          Liên hệ ngay để được tư vấn giải pháp cà phê phù hợp
                          cho doanh nghiệp của bạn
                        </p>
                        <Button
                          color="warning"
                          size="lg"
                          className="w-full font-semibold"
                        >
                          Liên hệ ngay
                        </Button>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </MasterLayout>
  );
}
