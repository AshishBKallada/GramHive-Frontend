import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gramhive6.vercel.app',
});

export const fetchDashboardData = async () => {
    try {
        const response = await api.get("/admin/dashboard");
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};

export const fetchChartOneData = async () => {
    try {
        const response = await api.get("/admin/chartone");
        return response.data;
    } catch (error) {
        console.error("Error fetching chart one data:", error);
        throw error;
    }
};

export const fetchChartTwoData = async () => {
    try {
        const response = await api.get("/admin/charttwo");
        return response.data;
    } catch (error) {
        console.error("Error fetching chart two data:", error);
        throw error;
    }
};
