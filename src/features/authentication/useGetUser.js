/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiGetCurrUserDataFromJWT } from "../../services/apiAuth";
// import { updateRemainingOrders } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export function useGetUser() {
  const token = localStorage.getItem("jwt");
  const [remainingOrders, setRemainingOrders] = useState(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["user", token],
    queryFn: () => apiGetCurrUserDataFromJWT(),
    enabled: !!token,
  });

  // console.log(data);

  useEffect(() => {
    if (data) {
      const userOrders = data.user?.remainingBatchOrder;
      setRemainingOrders(userOrders);
    }
  }, [data]);
  const user = data?.user;
  return {
    user,
    isLoading,
    error,
    remainingOrders,
    setRemainingOrders,
  };
}
