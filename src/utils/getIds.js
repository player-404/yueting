export default function getIds(id) {
    function getId(item, index) {
        if (index === 0) {
            return item.id ? `${item.id}` : `${item}`;
        }
        return item.id ? `,${item.id}` : `,${item}`
    }

    let ids = ''
    if (Array.isArray(id)) {
        id.forEach((item, index) => {
            ids += getId(item, index);
        });
    } else {
        ids = id;
    }

    return ids;
}