const sampleNames = [
    "Nguyễn Văn An",
    "Trần Thu Hà",
    "Lê Minh Quân",
    "Phạm Ngọc Mai",
    "Đỗ Quốc Bảo",
    "Vũ Khánh Linh"
];

const sampleScores = [8.5, 6, 9.5, 4.5, -1, 7];

// 1. Lọc và trả về mảng mới chỉ gồm các điểm hợp lệ (số từ 0 đến 10)
function getValidScores(scores) {
    // Kiểm tra đúng kiểu number và nằm trong đoạn [0, 10] để loại bỏ chữ, null, undefined, NaN và số ngoài khoảng
    return scores.filter(
        (score) => typeof score === "number" && score >= 0 && score <= 10
    );
}

// 2. Tính điểm trung bình của các điểm hợp lệ, làm tròn 2 chữ số thập phân
function averageScore(scores) {
    const validScores = getValidScores(scores);

    // Xử lý trường hợp đặc biệt: không có điểm hợp lệ nào thì trả về 0 để tránh phép chia 0/0 ra NaN
    if (validScores.length === 0) {
        return 0;
    }

    // Cộng dồn tổng điểm hợp lệ bằng reduce
    const totalScore = validScores.reduce((sum, score) => sum + score, 0);
    const average = totalScore / validScores.length;

    // Làm tròn đến 2 chữ số thập phân và dùng Number() đổi chuỗi từ toFixed về kiểu số
    return Number(average.toFixed(2));
}

// 3. Lấy n điểm hợp lệ cao nhất theo thứ tự giảm dần
function topScores(scores, n) {
  // Xử lý trường hợp đặc biệt: n bằng 0 hoặc âm thì trả về mảng rỗng ngay
  if (n <= 0) {
    return [];
  }

  const validScores = getValidScores(scores);

  // Sao chép bằng spread trước khi sort để không làm biến đổi mảng và sắp xếp giảm dần
  const sortedScores = [...validScores].sort((a, b) => b - a);

  // Cắt lấy n phần tử đầu tiên (nếu n lớn hơn số điểm hợp lệ, slice tự động lấy hết mảng)
  return sortedScores.slice(0, n);
}

// 4. Xếp hạng tên học viên theo điểm giảm dần
function rankNames(names, scores) {
  const validIndices = [];

  // Thu thập chỉ số (index) của những học viên có điểm hợp lệ
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    if (typeof score === "number" && score >= 0 && score <= 10) {
      validIndices.push(i);
    }
  }

  // Sắp xếp mảng chỉ số dựa theo điểm giảm dần; nếu bằng điểm thì giữ nguyên thứ tự ban đầu (a - b)
  validIndices.sort((indexA, indexB) => {
    if (scores[indexB] !== scores[indexA]) {
      return scores[indexB] - scores[indexA];
    }
    return indexA - indexB;
  });

  // Ánh xạ từ danh sách chỉ số đã sắp xếp sang mảng tên học viên tương ứng
  return validIndices.map((index) => names[index]);
}



// ================= TEST =================
console.log("--- 1. TEST getValidScores ---");
console.log("Kết quả :", getValidScores(sampleScores));
console.log("Kỳ vọng : [8.5, 6, 9.5, 4.5, 7]\n");

console.log("--- 2. TEST averageScore ---");
console.log("Điểm TB (kết quả) :", averageScore(sampleScores));
console.log("Điểm TB (kỳ vọng) : 7.1");
console.log("Mảng rỗng []      :", averageScore([]), "(kỳ vọng: 0)\n");

console.log("--- 3. TEST topScores ---");
console.log("Top 3 (kết quả) :", topScores(sampleScores, 3));
console.log("Top 3 (kỳ vọng) : [9.5, 8.5, 7]");
console.log("Top 0 (kết quả) :", topScores(sampleScores, 0), "(kỳ vọng: [])\n");

console.log("--- 4. TEST rankNames ---");
console.log("Kết quả :", rankNames(sampleNames, sampleScores));
console.log(
  "Kỳ vọng : ['Lê Minh Quân', 'Nguyễn Văn An', 'Vũ Khánh Linh', 'Trần Thu Hà', 'Phạm Ngọc Mai']\n"
);
