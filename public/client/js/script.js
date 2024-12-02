// Aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
 
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        theme: "#ebd0c2",
        type: "auto",
      },
    ],
    // Các tùy chọn player
    fixed: false, // Cố định player
    mini: false, // Chế độ mini
    autoplay: true, // Tự động phát
    theme: "#b7daff", // Màu theme chung
    loop: "all", // Chế độ lặp (all/one/none)
    order: "list", // Thứ tự phát (list/random)
    preload: "auto", // Chế độ tải trước
    volume: 0.2, // Âm lượng mặc định
    mutex: true, // Tắt các player khác khi phát
    listFolded: false, // Ẩn/hiện playlist
    listMaxHeight: 340, // Chiều cao tối đa playlist

    // Tùy chọn giao diện
    storageName: "aplayer-setting", // Tên storage lưu cấu hình
  });

  const avatar = document.querySelector(".inner-avatar img");
  ap.on("play",() => {
     avatar.style.animationPlayState= "running"
  })

  ap.on("pause",() => {
    avatar.style.animationPlayState= "paused"
 })
}

// End Aplayer


//Button Like 
const btnLike = document.querySelector(".inner-like");
if(btnLike){
  btnLike.addEventListener("click",() => {
    const songID = btnLike.getAttribute("data-songID");
    console.log(songID)
    const btnActive = btnLike.classList.contains("active");
    const typeLike = btnActive ? "dislike" : "like";
    const link = `/songs/${typeLike}/${songID}`;
    console.log(typeLike)
    console.log(link)
    fetch(link,{
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          const contentLike = btnLike.querySelector("span");
        contentLike.innerHTML = `${data.newLike} thích` 
        btnLike.classList.toggle("active");
        }
        
      })
  })
}
// End Button Like 



// Button Favorite 
const listbtnFavorite = document.querySelectorAll(".inner-heart");
if(listbtnFavorite.length > 0){
  listbtnFavorite.forEach(btnFavorite => {
    btnFavorite.addEventListener("click",() => {
      const songID = btnFavorite.getAttribute("data-songID");
      console.log(songID)
      const btnActive = btnFavorite.classList.contains("active");
      const typeFavorite = btnActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${songID}`;
      console.log(typeFavorite)
      console.log(link)
      fetch(link,{
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
          btnFavorite.classList.toggle("active");
          }
          
        })
    })
  })
 
}
// End Button Favorite 


