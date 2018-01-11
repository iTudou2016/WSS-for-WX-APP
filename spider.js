// ����httpsģ��
var https = require('https');
// Cheerio ��һ��Node.js�Ŀ⣬ �����Դ�html��Ƭ���й���DOM�ṹ��Ȼ���ṩ��jqueryһ����cssѡ������ѯ
var cheerio = require('cheerio');

// �������������Ŀ���ַ�������Ѽҵ���ҳ
var url = 'https://cloudpet.io/cat/sale';

https.get(url, function(res) {
    var html = '';
    // ��ȡҳ������
    res.on('data', function(data) {
        html += data;
    });
    // ���ݻ�ȡ����
    res.on('end', function() {
        // ͨ������ҳ����Ϣ��ȡʵ��������ֲ�ͼ��Ϣ
        var kittiesGridData = filterKittiesGrid(html);
        // ��ӡ��Ϣ
        printInfo(kittiesGridData);
    });
}).on('error', function() {
    console.log('��ȡ���ݳ���');
});

/* filter Kitties */
function filterKittiesGrid(html) {
    if (html) {
        // ����JQuery��񣬶���$
        var $ = cheerio.load(html);

        // ����id��ȡ�ֲ�ͼ�б���Ϣ
        var kittiesGrid = $('.KittiesGrid');
        // �ֲ�ͼ����
        var kittiesGridData = [];

        /* �ֲ�ͼ�б���Ϣ���� */
        kittiesGrid.find('div.KittiesGrid-item').each(function(item) {
            var pic = $(this);
            // �ҵ�a��ǩ����ȡhref����
            var pic_href = pic.find('a').attr('href');
            // ��ȡ�۸�
	    var pic_price = $(this).find('span.KittyStatus-note').text();
            // ��ȡ����
	    var pic_detail = [];
	    $(this).find('.KittyCard-details-item').each(function(item) {
		pic_detail.push($(this).text().trim());
	    });
            // �������������
            kittiesGridData.push({
                pic_href : pic_href,
		pic_price : pic_price,
		pic_detail : pic_detail,
            });
        });
        // �����ֲ�ͼ�б���Ϣ
        return kittiesGridData;
    } else {
        console.log('�����ݴ��룡');
    }
}

/* ��ӡ��Ϣ */
function printInfo(kittiesGridData) {
    // ����
    var count = 0;
    // ������Ϣ�б�
    kittiesGridData.forEach(function(item) {
        // ��ȡͼƬ��Ӧ�����ӵ�ַ
        var pic_href = item.pic_href;
	var pic_price = item.pic_price;
	var pic_detail = item.pic_detail;

        // ��ӡ��Ϣ
	console.log(pic_detail.slice(0,2).toString() + ","+ pic_price + ", " + pic_detail.slice(2,4).toString());
    });
}