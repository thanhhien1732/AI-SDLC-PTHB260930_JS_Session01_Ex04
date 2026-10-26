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



// ================= TEST =================
console.log("--- 1. TEST getValidScores ---");
console.log("Kết quả :", getValidScores(sampleScores));
console.log("Kỳ vọng : [8.5, 6, 9.5, 4.5, 7]\n");

console.log("--- 2. TEST averageScore ---");
console.log("Điểm TB (kết quả) :", averageScore(sampleScores));
console.log("Điểm TB (kỳ vọng) : 7.1");
console.log("Mảng rỗng []      :", averageScore([]), "(kỳ vọng: 0)\n");
