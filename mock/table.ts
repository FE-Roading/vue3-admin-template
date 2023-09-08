// 生成表格数据
import { MockMethod } from "vite-plugin-mock"

export default [
  {
    url: "/table/simple",
    method: "get",
    response: ({ query }) => {
      return {
        code: 200,
        msg: "成功",
        data: {
          data: [
            {
              id: "779778153637765469",
              username: "万敏",
              gender: 1,
              user: {
                detail: {
                  age: 16,
                },
              },
              idCard: "779778153637765469",
              email: "m.zfc@swr.bo",
              address: "河北省 保定市",
              createTime: "2013-07-16 08:57:46",
              status: 1,
              avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
            },
            {
              id: "805660172348512247",
              username: "苏超",
              gender: 1,
              user: {
                detail: {
                  age: 23,
                },
              },
              idCard: "805660172348512247",
              email: "p.xkyrnombv@xjlkffyv.sr",
              address: "内蒙古自治区 鄂尔多斯市",
              createTime: "1981-10-25 02:02:43",
              status: 1,
              avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
            },
            {
              id: "358878544635537747",
              username: "蒋刚",
              gender: 1,
              user: {
                detail: {
                  age: 26,
                },
              },
              idCard: "358878544635537747",
              email: "k.ydlv@ktbyc.ee",
              address: "重庆 重庆市",
              createTime: "1980-05-10 19:11:52",
              status: 0,
              avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
            },
            {
              id: "342406742434582137",
              username: "杜刚",
              gender: 2,
              user: {
                detail: {
                  age: 28,
                },
              },
              idCard: "342406742434582137",
              email: "j.gvuvge@ejfmx.bs",
              address: "陕西省 汉中市",
              createTime: "2008-11-08 08:08:21",
              status: 0,
              avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
            },
            {
              id: "837556874164624366",
              username: "邓超",
              gender: 1,
              user: {
                detail: {
                  age: 14,
                },
              },
              idCard: "837556874164624366",
              email: "d.mbpls@cjpu.fm",
              address: "浙江省 舟山市",
              createTime: "2012-09-08 17:15:08",
              status: 0,
              avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
            },
            {
              id: "358305829851132020",
              username: "汪艳",
              gender: 2,
              user: {
                detail: {
                  age: 29,
                },
              },
              idCard: "358305829851132020",
              email: "q.tspmynqzd@bbwvcyrxor.il",
              address: "四川省 攀枝花市",
              createTime: "1973-12-29 12:13:17",
              status: 1,
              avatar: "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
            },
            {
              id: "598516814183222163",
              username: "方杰",
              gender: 2,
              user: {
                detail: {
                  age: 28,
                },
              },
              idCard: "598516814183222163",
              email: "t.jdo@gqj.int",
              address: "湖南省 岳阳市",
              createTime: "2013-02-09 21:26:30",
              status: 0,
              avatar: "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
            },
            {
              id: "751468648622161444",
              username: "许静",
              gender: 2,
              user: {
                detail: {
                  age: 13,
                },
              },
              idCard: "751468648622161444",
              email: "s.yjn@cfyawt.fi",
              address: "福建省 厦门市",
              createTime: "2010-10-01 05:40:05",
              status: 0,
              avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
            },
            {
              id: "392237166876051835",
              username: "王勇",
              gender: 1,
              user: {
                detail: {
                  age: 28,
                },
              },
              idCard: "392237166876051835",
              email: "o.lkgjy@uejk.mt",
              address: "天津 天津市",
              createTime: "2021-12-09 13:02:58",
              status: 1,
              avatar: "https://i.imgtg.com/2023/01/16/QR57a.jpg",
            },
            {
              id: "266793559484442264",
              username: "韩敏",
              gender: 1,
              user: {
                detail: {
                  age: 22,
                },
              },
              idCard: "266793559484442264",
              email: "w.yylbtends@mlsltgf.vn",
              address: "江苏省 无锡市",
              createTime: "1987-12-20 23:50:00",
              status: 1,
              avatar: "https://i.imgtg.com/2023/01/16/QR57a.jpg",
            },
          ],
          page: Number(query.page),
          pageSize: Number(query.pageSize),
          total: 2000,
        },
      }
    },
  },
] as MockMethod[]
