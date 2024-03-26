import dayjs from "dayjs";
import { decodedUserFilialIdProps } from "../../../../types";
import { prisma } from "../../../clients/prisma-client";
export class MetricsUseCase {
  async popularDrivers({ filialId }: decodedUserFilialIdProps) {
    const drivers = await prisma.driver.findMany({
      where: {
        filialId,
      },
      select: {
        _count: {
          select: {
            recolhas: {
              where: {
                status: "finalizada",
              },
            },
          },
        },
        name: true,
      },
      take: 5,
    });
    return drivers.map((e) => {
      return { name: e.name, value: e._count.recolhas };
    });
  }
  async bigChart({ filialId }: decodedUserFilialIdProps) {
    const today = dayjs();
    const weekAgo = today.subtract(1, "week").toDate();
    const valor = await prisma.recolha.groupBy({
      by: ["createdAt"],
      where: {
        AND: [{ filialId }, { createdAt: { gt: weekAgo } }],
      },
      _count: true,
      orderBy: {
        createdAt: "asc",
      },
    });

    return valor
      .map((e) => {
        return {
          date: e.createdAt,
          count: e._count,
        };
      })
      .map((e) => {
        return {
          recolhas: e.count,
          data: e.date.toLocaleDateString("US", {
            month: "short",
            day: "numeric",
          }),
        };
      });
  }
  async dayRecolhasAmount({ filialId }: decodedUserFilialIdProps) {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const ordersPerDay = await prisma.recolha.groupBy({
      by: ["createdAt"],
      where: {
        filialId,
        createdAt: {
          gte: yesterday.toDate(),
        },
      },
      _count: true,
    });

    // filtrar todas as recolhas e concatenar a quantidade do dia de hoje
    const todayOrdersAmount = ordersPerDay
      .filter((orderInDay) => dayjs(orderInDay.createdAt).isSame(today, "day"))
      .reduce((total, order) => total + order._count, 0);

    // filtrar todas as recolhas e concatenar a quantidade do dia de ontem
    const yesterdayOrdersAmount = ordersPerDay
      .filter((orderInDay) =>
        dayjs(orderInDay.createdAt).isSame(yesterday, "day")
      )
      .reduce((total, order) => total + order._count, 0);
    console.log("yesterdayOrdersAmount", yesterdayOrdersAmount);

    // a diferença das recolhas do dia de hoje com as de ontem se o houver recolha nos dias
    const diffFromYesterday =
      yesterdayOrdersAmount && todayOrdersAmount
        ? (todayOrdersAmount * 100) / yesterdayOrdersAmount
        : null;

    return {
      amount: todayOrdersAmount ?? 0,
      diffFromYesterday: diffFromYesterday
        ? Number((diffFromYesterday - 100).toFixed(2))
        : 0,
    };
  }
  async monthCanceledRecolhasAmount({ filialId }: decodedUserFilialIdProps) {
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const cancelledRecolhasPerMonth = await prisma.recolha.groupBy({
      by: ["createdAt"],
      where: {
        AND: [
          { filialId },
          { createdAt: { gte: startOfLastMonth } },
          { status: "cancelada" }, // Adicione esta condição para considerar apenas recolhas canceladas
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthCancelledRecolhaAmount = cancelledRecolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(today, "month")
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0
      );

    const lastMonthCancelledRecolhasAmount = cancelledRecolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(lastMonth, "month")
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0
      );

    const diffFromLastMonthCancelled =
      lastMonthCancelledRecolhasAmount && currentMonthCancelledRecolhaAmount
        ? (currentMonthCancelledRecolhaAmount * 100) /
          lastMonthCancelledRecolhasAmount
        : null;

    return {
      amount: currentMonthCancelledRecolhaAmount ?? 0,
      diffFromLastMonthCancelled: diffFromLastMonthCancelled
        ? Number((diffFromLastMonthCancelled - 100).toFixed(2))
        : 0,
    };
  }
  async mothAmount({ filialId }: decodedUserFilialIdProps) {
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const camamaFilial = await prisma.filial.findFirst({
      where: {
        name: {
          contains: "Camama",
        },
      },
    });

    const recolhasPerMonth = await prisma.recolha.groupBy({
      by: ["filialId", "createdAt"],
      where: {
        AND: [
          { filialId: camamaFilial?.id },
          { createdAt: { gte: startOfLastMonth } },
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthRecolhaAmount = recolhasPerMonth.find(
      (recolhasInMonth) =>
        recolhasInMonth.createdAt.getFullYear() === today.year() &&
        recolhasInMonth.createdAt.getMonth() === today.month()
    );

    const lastMonthRecolhasAmount = recolhasPerMonth.find(
      (recolhasInMonth) =>
        recolhasInMonth.createdAt.getFullYear() === lastMonth.year() &&
        recolhasInMonth.createdAt.getMonth() === lastMonth.month()
    );

    const diffFromLastMonth =
      lastMonthRecolhasAmount && currentMonthRecolhaAmount
        ? (currentMonthRecolhaAmount._count._all * 100) /
          lastMonthRecolhasAmount._count._all
        : null;

    return {
      amount: currentMonthRecolhaAmount?._count._all ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  }
  //   async paymentAmount({ filialId }: decodedUserFilialIdProps) {
  //     const today = dayjs();
  //     const lastMonth = today.subtract(1, "month");
  //     const startOfLastMonth = lastMonth.startOf("month").toDate();

  //     const PaymentPerMonth = await prisma.payment.groupBy({
  //       by: ["", "createdAt"],
  //       where: {
  //         AND: [
  //           {
  //             client: {
  //               filialId,
  //               status: "pago",
  //             },
  //           },
  //           { createdAt: { gte: startOfLastMonth } },
  //         ],
  //       },
  //       _count: {
  //         _all: true,
  //       },
  //     });

  //     const currentMonthPaymentAmount = PaymentPerMonth.filter(
  //       (payment) =>
  //         payment.createdAt.getFullYear() === today.year() &&
  //         payment.createdAt.getMonth() === today.month()
  //     ).reduce((total, payment) => total + payment._count._all, 0);

  //     const lastMonthPaymentAmount = PaymentPerMonth.filter(
  //       (payment) =>
  //         payment.createdAt.getFullYear() === lastMonth.year() &&
  //         payment.createdAt.getMonth() === lastMonth.month()
  //     ).reduce((total, payment) => total + payment._count._all, 0);

  //     const diffFromLastMonth =
  //       lastMonthPaymentAmount && currentMonthPaymentAmount
  //         ? (currentMonthPaymentAmount * 100) / lastMonthPaymentAmount
  //         : null;

  //     return {
  //       amount: (currentMonthPaymentAmount ?? 0) * 2000,
  //       diffFromLastMonth: diffFromLastMonth
  //         ? Number((diffFromLastMonth - 100).toFixed(2))
  //         : 0,
  //     };
  //   }
}
