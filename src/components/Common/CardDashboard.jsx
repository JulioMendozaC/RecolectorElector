import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components//ui/card"

export const CardDashboard = ({title, data, description, size}) => {
    return (
        <Card className={size}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold"> {data}</div>
                <p className="text-xs text-muted-foreground w-full">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
