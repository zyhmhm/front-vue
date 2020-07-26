<template>
	<div>
		<div>
			<button type="button" @click="ExportExcel">导出Excel(第一种方式)</button>
			<button type="submit" @click="tableToExcel('tableExcel','','test2.xlsx')" class="btn btn-primary">
				<a id="download" href="" style="display: none;"></a>导出Excel（第二种方式）
			</button>
		</div>
		<div id="myDiv">
			<table id="tableExcel" style="width: 740px;">
				<thead>
					<tr>
						<td colspan="6" align="center" class="title">********账单（2019年05月）</td>
					</tr>
					<tr>
						<td colspan="6" align="right">打印日期：2019年05月09日</td>
					</tr>
					<tr>
						<td colspan="4" class="company_name">名称：********有限公司</td>
						<td colspan="2" align="right">合同号：1255664155</td>
					</tr>
					<tr>
						<td class="company_name">房产：</td>
						<tdcolspan="5"class="company_name">1121,909,e3091121,
							909,e3091121,909,e3091121,909,e309112
							</td>
					</tr>
				</thead>
				<colgroup>
					<col class="table_read" />
					<col class="table_room" />
					<col class="table_room" />
					<col class="table_read" />
					<col class="table_read" />
					<col class="table_read" />
				</colgroup>
				<tbody>
					<tr align="center">
						<td class="table_head">费项</td>
						<td class="table_head">房产</td>
						<td class="table_head">期间/读数|倍率</td>
						<td class="table_head">数量</td>
						<td class="table_head">单价</td>
						<td class="table_head">金额</td>
					</tr>
					<tr>
						<td>租金</td>
						<td class="ggg">101,e10022,1121,909,e309</td>
						<class="ggg">ccc</td>
							<td>ddd</td>
							<td align="right">0.20</td>
							<td align="right">332.20</td>
					</tr>    
					<tr>
						<td>管理费</td>
						<td class="ggg">1121,909,e309</td>
						<td class="ggg">CCC</td>
						<td>DDD</td>
						<td align="right">2.63</td>
						<td align="right">64652.32</td>
					</tr>
					<tr>
						<td>电梯费</td>
						<td class="ggg">1121,909,e309</td>
						<td class="ggg">HHH</td>
						<td>III</td>
						<td align="right">0.04</td>
						<td align="right">121458.23</td>
					</tr>
					<tr>
						<td>电费</td>
						<td class="ggg">1121,909,e309</td>
						<td class="ggg">HHH</td>
						<td>III</td>
						<td align="right">0.40</td>
						<td align="right">236.00</td>
					</tr>
					<tr>
						<td>水费</td>
						<td class="ggg">1121,909,e309</td>
						<td class="ggg">HHH</td>
						<td>III</td>
						<td class="hhh" align="right">2521221122</td>
						<td align="right">293658.92</td>
					</tr>
					<tr>
						<td rowspan="4">说明</td>
						<td colspan="3" rowspan="4">
							请于当月5日前缴清费用，费用有疑问请拨打0755-21000374，咨询转账请留言13799988555，
							逾期按日收取月租金的0.5%违约金，
							逾期未交者，将按合同约定执行，恕不另行通知
						</td>
						<td align="right" class="ccc">本期总计：</td>
						<td align="right" class="ddd">11111.00</td>
					</tr>
					<tr>
						<td align="right" class="ccc">往期欠缴：</td>
						<td align="right" class="ddd">440.00</td>
					</tr>
					<tr>
						<td align="right" class="ccc">应付总额：</td>
						<td align="right" class="ddd">11551.00</td>
					</tr>
					<tr>
						<td align="right" class="eee">违约金：</td>
						<td align="right" class="fff">22.00</td>
					</tr>
				</tbody>
			</table>
		</div>

	</div>
</template>

<script>
	export default {
		methods: {
			ExportExcel(data) { // 第一种方式
				let lHtml = document.getElementById("myDiv").innerHTML;
				let tableHtml = '<html><head><meta charset="UTF-8">' +
					'<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' +
					'<style>' +
					'.title{\n' +
					'  font-size: 22px;\n' +
					'height: 32px;' +
					'}\n' +
					'.company_name{\n' +
					'  font-size: 16px;\n' +
					'height: 30px;' +
					'}' +
					' .table_head{\n' +
					'  font-size: 14px;height: 24px;\n' +
					'  }\n' +
					'table{\n' +
					'  width: 740px;\n' +
					'  table-layout:fixed;' +
					'}\n' +
					'td{\n' +
					'  padding: 0 5px;\n' +
					'  overflow:hidden;\n' +
					'  mso-number-format:"\#\,\#\#0\.00"' +
					'}\n' +
					'tbody td{\n' +
					'  height: 30px;\n' +
					'  font-size: 15px;\n' +
					'  border:0.5px solid #000;' +
					'}\n' +
					'.ccc{\n' +
					'  border: 0;\n' +
					'}\n' +
					'.ddd{' +
					'border: 0;' +
					'border-right: 0.5px solid #000;\n' +
					'}\n' +
					'.eee{\n' +
					'  border: 0;\n' +
					'  border-bottom: 0.5px solid #000;\n' +
					'}\n' +
					'.fff{\n' +
					'  border: 0;\n' +
					'  border-bottom: 0.5px solid #000;\n' +
					'  border-right: 0.5px solid #000;\n' +
					'}' +
					'.ggg{' + // 设置溢出省略号，无效
					'  word-break:keep-all;\n' +
					'  white-space:nowrap;\n' +
					'  overflow:hidden;\n' +
					'  text-overflow:ellipsis;\n' +
					'}' +
					'.hhh{' +
					'  mso-number-format:"\@";' + // 设置单元格类型
					'}' +
					' .table_room{\n' +
					'    width: 170px;\n' +
					'  }\n' +
					' .table_read{\n' +
					'    width: 100px;\n' +
					'  }' +
					'@page\n' +
					'  {margin:0.80cm 0.90cm 0.80cm 1.80cm; \n' +
					'   mso-header-margin:0.51cm;\n' +
					'   mso-footer-margin:0.51cm;}' +
					'</style>' +
					'</head><body>';
				tableHtml += lHtml;
				tableHtml += '</body></html>';
				console.log(tableHtml)
				let excelBlob = new Blob([tableHtml], {
					type: 'application/vnd.ms-excel'
				});
				let fileName = "test1.xls";
				if (this.isIE()) {
					window.navigator.msSaveOrOpenBlob(excelBlob, fileName);
				} else {
					//  这里是两种方式的区别之处 直接导出HTML内容，这种在Excel表格里会自动使用
					// 文件名作为工作表名称
					let a = document.createElement('a');
					a.href = URL.createObjectURL(excelBlob);
					a.download = fileName;
					document.body.appendChild(a);
					a.click();
				}
			},
			
			// ! ** ** ** ** ** ** ** ** 第二种方式 ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** 
			tableToExcel(tableId, name, filename) {
				if (this.isIE()) {
					window.navigator.msSaveOrOpenBlob(excelBlob, fileName);
					return;
				}
				let uri = 'data:application/vnd.ms-excel;base64,',
					//Excel样式代码
					template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"
				xmlns: x = "urn:schemas-microsoft-com:office:excel"
				'+
				'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml> <
				x: ExcelWorkbook > < x: ExcelWorksheets > < x: ExcelWorksheet > ' +
					'<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/> <
					/x:WorksheetOptions></x: ExcelWorksheet > < /x:ExcelWorksheets>' +
					'</x:ExcelWorkbook></xml><![endif]-->' +
					'<meta http-equiv=Content-Type content="text/html; charset=utf-8">' +
					'<style>' +
					'.title{\n' +
					'  font-size: 22px;\n' +
					'height: 32px;' +
					'}\n' +
					'.company_name{\n' +
					'  font-size: 16px;\n' +
					'height: 30px;' +
					'}' +
					' .table_head{\n' +
					'  font-size: 14px;height: 24px;\n' +
					'  }\n' +
					'table{\n' +
					'  width: 740px;\n' +
					'  table-layout:fixed;' +
					'}\n' +
					'td{\n' +
					'  padding: 0 5px;\n' +
					'  overflow:hidden;\n' +
					'  mso-number-format:"\#\,\#\#0\.00"' +
					'}\n' +
					'tbody td{\n' +
					'  height: 30px;\n' +
					'  font-size: 15px;\n' +
					'  border:0.5px solid #000;' +
					'}\n' +
					'.ccc{\n' +
					'  border: 0;\n' +
					'}\n' +
					'.ddd{' +
					'border: 0;' +
					'border-right: 0.5px solid #000;\n' +
					'}\n' +
					'.eee{\n' +
					'  border: 0;\n' +
					'  border-bottom: 0.5px solid #000;\n' +
					'}\n' +
					'.fff{\n' +
					'  border: 0;\n' +
					'  border-bottom: 0.5px solid #000;\n' +
					'  border-right: 0.5px solid #000;\n' +
					'}' +
					'.ggg{' +
					'  word-break:keep-all;\n' +
					'  white-space:nowrap;\n' +
					'  overflow:hidden;\n' +
					'  text-overflow:ellipsis;\n' +
					'}' +
					'.hhh{' +
					'  mso-number-format:"\@";' +
					'}' +
					' .table_room{\n' +
					'    width: 170px;\n' +
					'  }\n' +
					' .table_read{\n' +
					'    width: 100px;\n' +
					'  }' +
					'@page\n' + // 设置页边距，以厘米为单位，也可以以英寸in为单位
					'  {margin:0.80cm 0.90cm 0.80cm 1.80cm; \n' +
					'   mso-header-margin:0.51cm;\n' +
					'   mso-footer-margin:0.51cm;}' +
					'</style>' +
					'</head><body><table><colgroup>\n' +
					'<col class="table_read"/><col class="table_room"/> <
					col class = "table_room" / > < col class = "table_read" / >
					<
					col class = "table_read" / > < col class = "table_read" / > \n ' +
				'</colgroup>' +
				'{table}' +
				'</table></body></html>',
				base64 = function(s) {
						return window.btoa(unescape(encodeURIComponent(s)))
					},
					format = function(s, c) {
						return s.replace(/{(\w+)}/g,
							function(m, p) {
								return c[p];
							})
					};
				//  这里是两种方式的区别之处 把页面转为base64码导出 name是工作表名称，可以为空
				let table;
				if (!tableId.nodeType) table = document.getElementById(tableId);
				let ctx = {
					worksheet: name || 'Worksheet',
					table: table.innerHTML
				};
				document.getElementById("download").href = uri + base64(format(template, ctx));
				document.getElementById("download").download = filename;
				document.getElementById("download").click();
			}
		},


		isIE() {
			if (!!window.ActiveXObject || "ActiveXObject" in window) {
				return true;
			} else {
				return false;
			}
		}

	},
	}
</script>

<style scoped>
	.title {
		font-size: 20px;
	}

	.company_name {
		font-size: 16px;
		height: 30px;
	}

	table {
		table-layout: fixed;
	}

	td {
		padding: 0 5px;
		border: 1px solid #aaa;
		/*word-break:keep-all;*/
		/*white-space:nowrap;*/
		overflow: hidden;
		/*text-overflow:ellipsis;*/
	}

	thead td:last-child {}

	tbody td {
		height: 30px;
		font-size: 15px;
		border: 1px solid #000;
	}

	.ggg {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ccc {
		border: 0;
	}

	.ddd {
		border: 0;
		border-right: 1px solid #000;
	}

	.eee {
		border: 0;
		border-bottom: 1px solid #000;
	}

	.fff {
		border: 0;
		border-bottom: 1px solid #000;
		border-right: 1px solid #000;
	}

	.table_head {
		font-size: 12px;
		height: 24px;
	}

	.table_room {
		width: 170px;
	}

	.table_read {
		width: 100px;
	}
</style>
