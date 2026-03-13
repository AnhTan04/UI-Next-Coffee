import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Spacer,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
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
} from "@heroicons/react/24/outline";
import Navbar from "@/components/layouts/Navbar";
import useFeedback from "@/hooks/useFeedback";

const FeedbackPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isReplyOpen, onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const {
    loading,
    error,
    feedbackList,
    subjects,
    statuses,
    stats,
    pagination,
    getFeedbackList,
    getSubjects,
    getStatuses,
    getFeedbackStats,
    updateFeedbackStatus,
    deleteFeedback,
    getSubjectLabel,
    getStatusLabel,
    clearError,
  } = useFeedback();

  // Load initial data
  useEffect(() => {
    getSubjects();
    getStatuses();
    getFeedbackStats();
    getFeedbackList({ page: 1, limit: 10 });
  }, [getSubjects, getStatuses, getFeedbackStats, getFeedbackList]);

  // Handle search and filter
  const handleSearch = () => {
    getFeedbackList({
      page: 1,
      limit: pagination.limit,
      search: searchTerm,
      status: selectedStatus,
      subject: selectedSubject,
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    getFeedbackList({
      page: newPage,
      limit: pagination.limit,
      search: searchTerm,
      status: selectedStatus,
      subject: selectedSubject,
    });
  };

  // Handle view feedback
  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    onViewOpen();
  };

  // Handle reply to feedback
  const handleReplyFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyText(feedback.adminReply || "");
    setNewStatus(feedback.status);
    onReplyOpen();
  };

  // Handle delete feedback
  const handleDeleteFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    onDeleteOpen();
  };

  // Submit reply
  const handleSubmitReply = async () => {
    if (!selectedFeedback) return;

    const result = await updateFeedbackStatus(selectedFeedback.id, {
      status: newStatus,
      adminReply: replyText,
    });

    if (result.success) {
      onReplyClose();
      setReplyText("");
      setNewStatus("");
      // Refresh the list
      getFeedbackList({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: selectedStatus,
        subject: selectedSubject,
      });
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedFeedback) return;

    const result = await deleteFeedback(selectedFeedback.id);

    if (result.success) {
      onDeleteClose();
      // Refresh the list
      getFeedbackList({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: selectedStatus,
        subject: selectedSubject,
      });
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedSubject("");
    getFeedbackList({ page: 1, limit: pagination.limit });
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 text-white py-12">
              <div className="flex flex-col items-center text-center w-full">
                <div className="p-4 bg-white/20 rounded-full mb-4">
                  <ChatBubbleLeftRightIcon className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Quản Lý Phản Hồi
                </h1>
                <p className="text-white/90 text-lg max-w-2xl">
                  Xem và quản lý tất cả phản hồi từ khách hàng
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card className="shadow-lg">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Tổng số</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </CardBody>
              </Card>

              <Card className="shadow-lg">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClockIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Chờ xử lý</h3>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </CardBody>
              </Card>

              <Card className="shadow-lg">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExclamationTriangleIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Đang xử lý</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
                </CardBody>
              </Card>

              <Card className="shadow-lg">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Đã giải quyết</h3>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </CardBody>
              </Card>

              <Card className="shadow-lg">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XMarkIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Đã đóng</h3>
                  <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Search and Filter */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 py-4">
              <div className="flex items-center gap-3">
                <FunnelIcon className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-800">Tìm kiếm và Lọc</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email, nội dung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tất cả trạng thái</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tất cả chủ đề</option>
                  {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
                  >
                    Tìm kiếm
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>

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
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 py-4">
              <h2 className="text-xl font-bold text-indigo-800">
                Danh sách phản hồi ({pagination.total} kết quả)
              </h2>
            </CardHeader>
            <CardBody className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Đang tải...</span>
                </div>
              ) : feedbackList.length === 0 ? (
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Không có phản hồi nào
                  </h3>
                  <p className="text-gray-500">
                    Chưa có phản hồi nào phù hợp với tiêu chí tìm kiếm
                  </p>
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
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-gray-500" />
                                <span className="font-semibold text-gray-800">
                                  {feedback.fullName}
                                </span>
                              </div>
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
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {formatDate(feedback.createdAt)}
                              </div>
                            </div>

                            <p className="text-gray-700 line-clamp-2 mb-3">
                              {feedback.content}
                            </p>

                            {feedback.adminReply && (
                              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                                <p className="text-sm font-semibold text-blue-800 mb-1">
                                  Phản hồi từ Admin:
                                </p>
                                <p className="text-blue-700 text-sm">
                                  {feedback.adminReply}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleViewFeedback(feedback)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Xem chi tiết"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReplyFeedback(feedback)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Phản hồi"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteFeedback(feedback)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <TrashIcon className="w-5 h-5" />
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
                                    ? "bg-blue-600 text-white"
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

      {/* View Feedback Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Chi tiết phản hồi
          </ModalHeader>
          <ModalBody>
            {selectedFeedback && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <p className="text-gray-900">{selectedFeedback.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedFeedback.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <p className="text-gray-900">{selectedFeedback.phone || "Không có"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Chủ đề
                    </label>
                    <Chip color="primary" variant="bordered" size="sm">
                      {getSubjectLabel(selectedFeedback.subject)}
                    </Chip>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <Chip
                      color={getStatusColor(selectedFeedback.status)}
                      variant="flat"
                      startContent={React.createElement(getStatusIcon(selectedFeedback.status), { className: "w-4 h-4" })}
                      size="sm"
                    >
                      {getStatusLabel(selectedFeedback.status)}
                    </Chip>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Thời gian tạo
                    </label>
                    <p className="text-gray-900">{formatDate(selectedFeedback.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nội dung phản hồi
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedFeedback.content}
                    </p>
                  </div>
                </div>

                {selectedFeedback.adminReply && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phản hồi từ Admin
                    </label>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <p className="text-blue-900 whitespace-pre-wrap">
                        {selectedFeedback.adminReply}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              onClick={onViewClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Đóng
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reply Modal */}
      <Modal isOpen={isReplyOpen} onClose={onReplyClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Phản hồi khách hàng
          </ModalHeader>
          <ModalBody>
            {selectedFeedback && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Phản hồi từ: {selectedFeedback.fullName}
                  </h4>
                  <p className="text-gray-700">{selectedFeedback.content}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phản hồi của bạn
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Nhập phản hồi cho khách hàng..."
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              onClick={onReplyClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mr-2"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmitReply}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Đang gửi..." : "Gửi phản hồi"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Xác nhận xóa
          </ModalHeader>
          <ModalBody>
            {selectedFeedback && (
              <div>
                <p className="text-gray-700 mb-4">
                  Bạn có chắc chắn muốn xóa phản hồi từ{" "}
                  <strong>{selectedFeedback.fullName}</strong>?
                </p>
                <div className="bg-red-50 border border-red-200 p-3 rounded">
                  <p className="text-red-800 text-sm">
                    <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              onClick={onDeleteClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mr-2"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Đang xóa..." : "Xóa"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackPage; 