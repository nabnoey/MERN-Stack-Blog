import React, { useState } from "react";
import DOMPurify from "dompurify";

const PostDetail = () => {
  const [post, setPost] = useState({
    id: 1,
    title:
      "[ไม่ยืนยัน] IBM ใกล้ปิดดีลซื้อกิจการ Confluent บริษัทเทคโนโลยี Data Streaming มูลค่า 1.1 หมื่นล้านดอลลาร์",
    cover:
      "https://www.blognone.com/sites/default/files/news-feature-image/2025/2025-12/b0bwy4k.jpg",
    author: "arjin",
    createAt: "8 December 2025 - 12:10",
    content: `
      <p>The Wall Street Journal อ้างแหล่งข่าวที่เกี่ยวข้องว่า IBM กำลังเจรจาในขั้นสุดท้ายเพื่อซื้อกิจการ Confluent บริษัทพัฒนาเทคโนโลยีสำหรับการสตรีมข้อมูล ด้วยมูลค่ากิจการประมาณ 1.1 หมื่นล้านดอลลาร์ คาดว่าดีลนี้จะประกาศเป็นทางการภายใน 1-2 วันข้างหน้า <br> เทคโนโลยีของ Confluent สำหรับการสตรีมข้อมูล (Data Streaming) มีความต้องการการใช้งานมากขึ้นในยุคของ AI โดยเฉพาะสำหรับลูกค้าองค์กรที่มีข้อมูลฟีดเข้ามาใหม่ต่อวันจำนวนมาก เช่น อุตสาหกรรมค้าปลีก เทคโนโลยี หรือการเงิน <br> ดีลซื้อกิจการขนาดใหญ่ของ IBM ล่าสุดคือ HashiCorp ที่มูลค่า 6.4 พันล้านดอลลาร์ ซึ่งการซื้อกิจการเสร็จสิ้นเมื่อต้นปี</p>
    `,
  });

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img src={post.cover} alt={post.title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>

        <p>{post.createAt}</p>
        <p>{post.author}</p>

        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;