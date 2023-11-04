import { g, config } from '@grafbase/sdk';

const User = g.model('User', {
    username: g.string().optional(),
    email: g.email(),
    password: g.string().length({ min: 2, max: 20 }).optional(),
    image: g.url().optional(),
    createdAt: g.date(),
    updatedAt: g.date(),
    reports: g
        .relation(() => Report)
        .list()
        .optional(),
});
const Report = g.model('Report', {
    name: g.string(),
    createdAt: g.date(),
    updatedAt: g.date(),
    date: g.date(),
    bodyMap: g.relation(() => BodyMap),
    reporter: g.relation(() => User),
});

const BodyMap = g.model('BodyMap', {
    map: g.json(),
    report: g.relation(() => Report),
});

export default config({
    schema: g,
});
