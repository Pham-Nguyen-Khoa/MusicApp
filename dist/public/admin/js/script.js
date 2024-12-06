document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("image");
  const previewContainer = document.getElementById("imagePreview");
  const previewImg = document.getElementById("previewImg");
  const removeButton = document.getElementById("removeImage");

  // Xử lý khi chọn file
  imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewContainer.classList.add("active");
      };

      reader.readAsDataURL(file);
    }
  });

  // Xử lý khi xóa ảnh
  removeButton.addEventListener("click", function () {
    imageInput.value = "";
    previewImg.src = "";
    previewContainer.classList.remove("active");
  });

  // Xử lý drag and drop
  const fileUpload = document.querySelector(".file-upload");

  fileUpload.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("dragover");
  });

  fileUpload.addEventListener("dragleave", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
  });

  fileUpload.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      imageInput.files = e.dataTransfer.files;
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewContainer.classList.add("active");
      };

      reader.readAsDataURL(file);
    }
  });
});

const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudioPlay.querySelector("source");
  uploadAudioInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}
