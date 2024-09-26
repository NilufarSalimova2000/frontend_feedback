import { allget, categoryget } from "./service.js"

const tabList = document.querySelector(".tab_list");
const feedbackList = document.querySelector(".feedback_list");
const btn = document.getElementsByClassName("btn");
const searchInput = document.querySelector(".search_input");
let activeTab = "";
const addBtn = document.querySelector('.add_btn');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal-btn');

const renderTab = async () => {
    const data = await categoryget();
    tabList.innerHTML = data?.map((item) => (
        `<button data-id="${item}" class="font-semibold text-[13px] text-[#4661e6] rounded-[10px] bg-[#f2f4ff] py-[6px] px-[16px] btn">${item}</button>`
    )).join("");

    if (data && data.length > 0) {
        renderFeedback(data[0].item); 
        btn[0].style.color = "#fff"; 
        btn[0].style.backgroundColor = "#4661E6"; 
    }
};
renderTab();

const renderFeedback = async (item) => {
    const data = await allget(item);
    feedbackList.innerHTML = data?.map((item) => (
        `<li class="w-[825px] rounded-[10px] bg-[#fff] py-[28px] px-[32px] flex items-center justify-between mb-[20px]">
        <div class="flex items-start gap-[40px]">
            <a class="font-bold text-[13px] tracking-[-0.01em] text-[#3a4374] text-center rounded-[10px] bg-[#f2f4fe] px-[9px] pb-[8px] pt-[14px] inline-block" href="#">
                <img class="mb-[8px] ml-[5px]" src="./img/icon3.svg" alt="icon">
                ${item.votes}
            </a>
            <div>
                <h2 class="font-bold text-[18px] tracking-[-0.01em] text-[#3a4374] mb-[4px]">${item.title}</h2>
                <p class="font-normal text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
                <button class="font-semibold text-[13px] text-[#4661e6] rounded-[10px] bg-[#f2f4ff] py-[6px] px-[16px]">${item.type}</button>
            </div>
        </div>
        <div class="flex gap-[8px]">
            <img src="./img/icon4.svg" alt="icon">
            <p class="font-bold text-[16px] tracking-[-0.01em] text-[#3a4374]">2</p>
        </div>
    </li>`
    )).join("");
}

tabList.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        renderFeedback(e.target.dataset.id);
        for (let i of btn) {
            i.style.color = "";
            i.style.backgroundColor = "";
        }
        e.target.style.backgroundColor = "#4661E6";
        e.target.style.color = "#fff";
    }
});

const renderSearch = async (query) => {
    if (query.length > 0) {
        try {
            const res = await fetch(`https://product-feedback-data.vercel.app/all?title_like=${query}`);
            const data = await res.json();

            if (data.length === 0) {
                feedbackList.innerHTML = "<p class='text-center font-bold text-[22px] tracking-[-0.01em] text-[#3a4374]'>Bunday ma'lumot topilmadi</p>";
            } else {
                feedbackList.innerHTML = data.map((item) => (
                    `<li class="w-[825px] rounded-[10px] bg-[#fff] py-[28px] px-[32px] flex items-center justify-between mb-[20px]">
                    <div class="flex items-start gap-[40px]">
                        <a class="font-bold text-[13px] tracking-[-0.01em] text-[#3a4374] text-center rounded-[10px] bg-[#f2f4fe] px-[9px] pb-[8px] pt-[14px] inline-block" href="#">
                            <img class="mb-[8px] ml-[5px]" src="./img/icon3.svg" alt="icon">
                            ${item.votes}
                        </a>
                        <div>
                            <h2 class="font-bold text-[18px] tracking-[-0.01em] text-[#3a4374] mb-[4px]">${item.title}</h2>
                            <p class="font-normal text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
                            <button class="font-semibold text-[13px] text-[#4661e6] rounded-[10px] bg-[#f2f4ff] py-[6px] px-[16px]">${item.type}</button>
                        </div>
                    </div>
                    <div class="flex gap-[8px]">
                        <img src="./img/icon4.svg" alt="icon">
                        <p class="font-bold text-[16px] tracking-[-0.01em] text-[#3a4374]">2</p>
                    </div>
                </li>`
                )).join("");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            feedbackList.innerHTML = "<p class='text-center text-red-500'>Error loading data</p>";
        }
    } else {
        renderFeedback(activeTab);
    }
};


const useDebounce = () => {
    let id;
    return () => {
        clearTimeout(id);
        id = setTimeout(() => {
            renderSearch(searchInput.value);
        }, 300); 
    };
};

const debounce = useDebounce();

searchInput.addEventListener("input", debounce);


addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('visible');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    }
});