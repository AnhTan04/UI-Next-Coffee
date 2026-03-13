import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Spacer,
} from "@heroui/react";
import {
  ChatBubbleLeftRightIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import useFeedback from "@/hooks/useFeedback";

const MyFeedbackPage = () => {
  const router = useRouter();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    loading,
    error,
    feedbackList,
    subjects,
    statuses,
    pagination,
    getMyFeedback,
    getSubjects,
    getStatuses,
    getSubjectLabel,
    getStatusLabel,
    clearError,
  } = useFeedback();

  // Load initial data
  useEffect(() => {
    getSubjects();
    getStatuses();
    getMyFeedback({ page: 1, limit: 10 });
  }, [getSubjects, getStatuses, getMyFeedback]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    getMyFeedback({
      page: newPage,
      limit: pagination.limit,
    });
  };

  // Handle view feedback
  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsViewModalOpen(true);
  };

  // Close modal
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedFeedback(null);
  };

  // Navigate to contact page
  const handleCreateFeedback = () => {
    router.push('/lien-he');
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "resolved":
        return "success";
      case "closed":
        return "default";
      default:
        return "default";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return ClockIcon;
      case "processing":
        return ExclamationTriangleIcon;
      case "resolved":
        return CheckCircleIcon;
      case "closed":
        return XMarkIcon;
      default:
        return ClockIcon;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white py-12">
              <div className="flex flex-col items-center text-center w-full">
                <div className="p-4 bg-white/20 rounded-full mb-4">
                  <ChatBubbleLeftRightIcon className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Feedback Của Tôi
                </h1>
                <p className="text-white/90 text-lg max-w-2xl">
                  Theo dõi trạng thái và phản hồi của các feedback bạn đã gửi
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tổng số</h3>
                <p className="text-2xl font-bold text-green-600">{pagination.total}</p>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Chờ xử lý</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {feedbackList.filter(f => f.status === 'pending').length}
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đang xử lý</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {feedbackList.filter(f => f.status === 'processing').length}
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đã giải quyết</h3>
                <p className="text-2xl font-bold text-green-600">
                  {feedbackList.filter(f => f.status === 'resolved').length}
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Error Display */}
          {error && (
            <Card className="shadow-lg mb-8 border-red-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-3 text-red-600">
                  <ExclamationTriangleIcon className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Có lỗi xảy ra</h4>
                    <p className="text-sm">{error}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="ml-auto p-1 hover:bg-red-100 rounded"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Feedback List */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-100 to-green-100 py-4">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-bold text-emerald-800">
                  Danh sách feedback của bạn ({pagination.total} kết quả)
                </h2>
                <button
                  onClick={handleCreateFeedback}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Gửi feedback mới
                </button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Đang tải...</span>
                </div>
              ) : feedbackList.length === 0 ? (
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Chưa có feedback nào
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Bạn chưa gửi feedback nào. Hãy chia sẻ ý kiến của bạn với chúng tôi!
                  </p>
                  <button
                    onClick={handleCreateFeedback}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Gửi feedback đầu tiên
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {feedbackList.map((feedback) => {
                    const StatusIcon = getStatusIcon(feedback.status);
                    return (
                      <div key={feedback.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Chip
                                color={getStatusColor(feedback.status)}
                                variant="flat"
                                startContent={<StatusIcon className="w-4 h-4" />}
                                size="sm"
                              >
                                {getStatusLabel(feedback.status)}
                              </Chip>
                              <Chip color="primary" variant="bordered" size="sm">
                                {getSubjectLabel(feedback.subject)}
                              </Chip>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <CalendarIcon className="w-4 h-4" />
                                {formatDate(feedback.createdAt)}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <UserIcon className="w-4 h-4" />
                                {feedback.fullName}
                              </div>
                              <div className="flex items-center gap-1">
                                <EnvelopeIcon className="w-4 h-4" />
                                {feedback.email}
                              </div>
                              {feedback.phone && (
                                <div className="flex items-center gap-1">
                                  <PhoneIcon className="w-4 h-4" />
                                  {feedback.phone}
                                </div>
                              )}
                            </div>

                            <p className="text-gray-700 line-clamp-2 mb-3">
                              {feedback.content}
                            </p>

                            {feedback.adminReply && (
                              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                                <p className="text-sm font-semibold text-green-800 mb-1">
                                  Phản hồi từ Admin:
                                </p>
                                <p className="text-green-700 text-sm">
                                  {feedback.adminReply}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleViewFeedback(feedback)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Xem chi tiết"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Hiển thị {(pagination.page - 1) * pagination.limit + 1} -{" "}
                      {Math.min(pagination.page * pagination.limit, pagination.total)} của{" "}
                      {pagination.total} kết quả
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1 || loading}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Trước
                      </button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                          .filter(page => 
                            page === 1 || 
                            page === pagination.totalPages || 
                            Math.abs(page - pagination.page) <= 2
                          )
                          .map((page, index, array) => (
                            <React.Fragment key={page}>
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-3 py-2 text-gray-500">...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(page)}
                                disabled={loading}
                                className={`px-3 py-2 rounded-lg ${
                                  page === pagination.page
                                    ? "bg-green-600 text-white"
                                    : "border border-gray-300 hover:bg-gray-50"
                                } disabled:opacity-50`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages || loading}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Custom Modal for View Feedback */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Chi tiết feedback</h2>
              <button
                onClick={closeViewModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedFeedback && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {selectedFeedback.fullName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {selectedFeedback.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {selectedFeedback.phone || "Không có"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Chủ đề
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <Chip color="primary" variant="bordered" size="sm">
                          {getSubjectLabel(selectedFeedback.subject)}
                        </Chip>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Trạng thái
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <Chip
                          color={getStatusColor(selectedFeedback.status)}
                          variant="flat"
                          startContent={React.createElement(getStatusIcon(selectedFeedback.status), { className: "w-4 h-4" })}
                          size="sm"
                        >
                          {getStatusLabel(selectedFeedback.status)}
                        </Chip>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thời gian gửi
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {formatDate(selectedFeedback.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung feedback
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedFeedback.content}
                      </p>
                    </div>
                  </div>

                  {selectedFeedback.adminReply && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phản hồi từ Admin
                      </label>
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                        <p className="text-green-900 whitespace-pre-wrap leading-relaxed">
                          {selectedFeedback.adminReply}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedFeedback.updatedAt && selectedFeedback.updatedAt !== selectedFeedback.createdAt && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cập nhật lần cuối
                      </label>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                        {formatDate(selectedFeedback.updatedAt)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeViewModal}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyFeedbackPage; 