import BudgetUsageUI from "@/src/components/units/budgetUsage/BudgetUsage.presenter";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function BudgetUsage() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];

    const [conditions, setConditions] = useState({
        expenseType: "운영비",
        clubName: "개발 동아리",
        paymentDate: {from: lastMonthString, to: todayString},
        paymentType: "카드",
        status: "대기",
        content: "",
        drafter: "",
        amount: {from: 0, to: 5000000}
    });

    const labels = {
        expenseType: "집행 유형",
        clubName: "동아리",
        paymentDate: "결제일",
        paymentType: "결제 방법",
        content: "내용",
        status: "상태",
        drafter: "기안자",
        amount: "금액"
    };

    const orderKeys = [
        "expenseType",
        "clubName",
        "paymentDate",
        "paymentType",
        "content",
        "amount",
        "drafter",
        "status",
    ];

    const types = {
        expenseType: "select",
        clubName: "selectWithSearch",
        paymentDate: "rangeDate",
        paymentType: "select",
        status: "select",
        content: "text",
        drafter: "text",
        amount: "number"
    }

    const options = {
        expenseType: ["운영비", "행사비", "소모품 구매"],
        paymentType: ["카드", "현금", "무통장입금"],
        status: ["대기", "승인", "반려"],
        clubName: ["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]
    }

    const defaultColumns = [
        {
            title: 'No',
            dataIndex: 'No',
            width: '1%',
            editable: false,
            type:'id'
        },
        {
            title: '집행유형',
            dataIndex: 'executionType',
            width: '5%',
            editable: true,
            type:'select',
            selects:['소모품 구매','운영비','행사비']
        },
        {
            title:'동아리',
            dataIndex: 'clubName',
            width: '5%',
            editable: true,
            type:'select',
            selects: ['빅데이터 동아리', '머신러닝 동아리', '개발 동아리']
        },
        {
            title:'내용',
            dataIndex: 'content',
            width: '12%',
            editable: true,
            type:'text',
            maxlength: 30
        },
        {
            title:'기안자',
            dataIndex: 'drafter',
            width: '5%',
            editable: true,
            type:'text',
            maxlength: 5
        },
        {
            title: '결제 방법',
            dataIndex: 'paymentType',
            width: '5%',
            editable: true,
            type:'select',
            selects:["카드", "현금", "무통장입금"],
        },
        {
            title:'결제일',
            dataIndex: 'paymentDate',
            width: '5%',
            editable: true,
            type:'date',
        },
        {
            title:'금액',
            dataIndex: 'amount',
            width: '1%',
            editable: true,
            type:'money',
            maxlength:10000000
        },
        {
            title:'상태',
            dataIndex: 'status',
            width: '1%',
            editable: true,
            type:'select',
            selects:['대기', '승인', '반려']
        },
        {
            title: '첨부파일',
            dataIndex: 'attachment',
            width: '3%',
            editable: true,
            type: 'file'
        }
    ];

    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    // 데이터 요청 함수 - 백엔드 개발 후 대체 필요
    const fetchData = async () => {
        try{
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const baseData = response.data;

            const data = Array.from({ length: 100 }, (_, index) => {
                const item = baseData[index % baseData.length];
                return {
                    No: index + 1,
                    executionType: '소모품 구매',
                    clubName: '빅데이터 동아리',
                    content: '',
                    drafter: '',
                    paymentType: ['카드', '현금', '무통장입금'][index % 3],
                    paymentDate: dayjs().add(index, 'day').format('YYYY-MM-DD'),
                    amount: 0,
                    status: ['대기', '승인', '반려'][index % 3],
                    attachment: '',
                };
            });

            setDataSource(data);
            setCount(data.length);
        }
        catch(error){
            console.error('데이터 로딩 실패:', error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleAdd = () => {
        const newData = defaultColumns.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD');
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count + 1;
            else if (type === 'money') acc[dataIndex] = 0;
            else acc[dataIndex] = '';
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchData();
    }, []);

    const permission1 = "admin";

    return <BudgetUsageUI
        conditions={conditions}
        setConditions={setConditions}
        labels={labels}
        orderKeys={orderKeys}
        options={options}
        types={types}
        dataSource={dataSource}
        setDataSource={setDataSource}
        defaultColumns={defaultColumns}
        loading={loading}
        setLoading={setLoading}
        handleAdd={handleAdd}
        permission1={permission1}
    />;
}