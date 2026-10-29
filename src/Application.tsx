import React, {useState} from "react"
import {Download, GitFork, RotateCcw} from "lucide-react"
import * as pdfjs from "pdfjs-dist"
import {Form, Button, Input, NumberField, Label, Select, ListBox,Chip, Typography, Slider, Card, Checkbox} from "@heroui/react"

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Entry {
    date: Date;
    time_start: number;
    time_end: number;
    hours: number;
}

const months = [
    {id: 0, name: "January"},
    {id: 1, name: "February"},
    {id: 2, name: "March"},
    {id: 3, name: "April"},
    {id: 4, name: "May"},
    {id: 5, name: "June"},
    {id: 6, name: "July"},
    {id: 7, name: "August"},
    {id: 8, name: "September"},
    {id: 9, name: "October"},
    {id: 10, name: "November"},
    {id: 11, name: "December"},
]

const days = [
    {id: 0, name: "Monday"},
    {id: 1, name: "Tuesday"},
    {id: 2, name: "Wednesday"},
    {id: 3, name: "Thursday"},
    {id: 4, name: "Friday"},
    {id: 5, name: "Saturday"},
    {id: 6, name: "Sunday"}
]

function Application() {


    const [numberOfDaysRange, setNumberOfDaysRange] = useState([3, 6])
    const [sumOfHoursRange, setSumOfHoursRange] = useState([10, 10])
    const [hoursPerDayRange, setHoursPerDayRange] = useState([1, 5])
    const [allowedWorkDays, setAllowedWorkDays] = useState([0, 1, 2, 3, 4])
    const [allowedWorkTimeRange, setAllowedWorkTimeRange] = useState([8, 20])
    const [includeHolidays, setIncludeHolidays] = useState(false)
    const [document, setDocument] = useState(0)

    const now = new Date()

    const [month, setMonth] = useState(now.getMonth())
    const [year, setYear] = useState(now.getFullYear())

    const date_start = new Date(year, month, 1)
    const date_end = new Date(year, (month + 1) % 12, 0)


    const [entries, setEntries] = useState<Entry[]>([])

    async function process(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        setEntries([])

        const numberOfDays = Math.floor((numberOfDaysRange[1] - numberOfDaysRange[0]) * Math.random()) + numberOfDaysRange[0]
        for(let index = 0; index < numberOfDays; index++) {

            const day = Math.floor((date_end.getDate() - 1) * Math.random()) + 1
            const date = new Date(year, month, day)

            const time_start = 8
            const time_end = 12
            const hours = time_end - time_start

            const entry = {
                date: date,
                time_start: time_start,
                time_end: time_end,
                hours: hours
            }
            setEntries((previous) => [...previous, entry])
        }

        console.log(entries)

        // try {
        //     const buffer = await file.arrayBuffer()
        //
        //     const document = await pdfjs.getDocument({data: buffer}).promise
        //
        //     const fields: Field[] = []
        //     for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
        //         const page = await document.getPage(pageNumber)
        //         const annotations = await page.getAnnotations()
        //
        //         for (const annotation of annotations) {
        //             if (annotation.subtype !== "Widget")
        //                 continue
        //
        //             fields.push({
        //                 id: annotation.id,
        //                 name: annotation.fieldName,
        //                 type: annotation.fieldType
        //             })
        //         }
        //     }
        //
        //     console.log(`Found ${fields.length} interactive fields:`, fields);
        // } catch (error) {
        //     console.error("Failed to parse PDF:", error);
        // }
    }







    const documents = [
        {id: 0, name: "2025"}
    ]

    return <div className="p-3 flex flex-col gap-3">
        <Card>
            <div className="flex justify-between gap-3">
                <Typography type="h3" className="font-bold">
                    TU Darmstadt Faker
                </Typography>
                <div className="flex flex-col justify-center"><Chip>v{__APP_VERSION__}</Chip></div>
                <div className="grow"></div>
                <Button className="" variant="secondary">
                    <GitFork/> GitHub
                </Button>
            </div>
        </Card>

        <div className="flex gap-3">

            <Card className="w-1/3" variant="default">
                <Form className="flex flex-col gap-3" onSubmit={process}>
                    <div className="flex gap-3">
                        <div className="flex-1 flex flex-col">
                            <Label htmlFor="month">Month</Label>
                            <Select id="month" name="month" variant="secondary" value={month} onChange={(_, value: number) => {setMonth(value)}}>
                                <Select.Trigger>
                                    <Select.Value/>
                                    <Select.Indicator/>
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {months.map((month) => (
                                            <ListBox.Item id={month.id} textValue={month.name}>
                                                {month.name}
                                                <ListBox.ItemIndicator/>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <Label htmlFor="year">Year</Label>
                            <NumberField id="year" name="year" variant="secondary" formatOptions={{useGrouping: false, style: "decimal"}} value={year} onChange={(e) => {setYear(e)}} >
                                <NumberField.Group>
                                    <NumberField.DecrementButton/>
                                    <NumberField.Input className="text-center"/>
                                    <NumberField.IncrementButton/>
                                </NumberField.Group>
                            </NumberField>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="numberOfDays">Number of Days</Label>
                        <Slider id="numberOfDays" name="numberOfDays" variant="secondary" value={numberOfDaysRange} maxValue={31} minValue={1} step={1} onChange={setNumberOfDaysRange}>
                            <Slider.Output/>
                            <Slider.Track>
                                {({state}) => (
                                    <div>
                                        <Slider.Fill/>
                                        {state.values.map((_, index) => (
                                            <Slider.Thumb key={index} index={index} />
                                        ))}
                                    </div>
                                )}
                            </Slider.Track>
                        </Slider>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="sumOfHours">Sum of Hours</Label>
                        <Slider id="sumOfHours" name="sumOfHours" variant="secondary" value={sumOfHoursRange} maxValue={40} minValue={0} step={1} onChange={setSumOfHoursRange}>
                            <Slider.Output/>
                            <Slider.Track>
                                {({state}) => (
                                    <div>
                                        <Slider.Fill/>
                                        {state.values.map((_, index) => (
                                            <Slider.Thumb key={index} index={index} />
                                        ))}
                                    </div>
                                )}
                            </Slider.Track>
                        </Slider>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="hoursPerDay">Hours per Day</Label>
                        <Slider id="hoursPerDay" name="hoursPerDay" variant="secondary" value={hoursPerDayRange} maxValue={24} minValue={0} step={1} onChange={setHoursPerDayRange}>
                            <Slider.Output/>
                            <Slider.Track>
                                {({state}) => (
                                    <div>
                                        <Slider.Fill/>
                                        {state.values.map((_, index) => (
                                            <Slider.Thumb key={index} index={index} />
                                        ))}
                                    </div>
                                )}
                            </Slider.Track>
                        </Slider>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1 flex flex-col">
                            <Label htmlFor="allowedWorkDays">Allowed work days</Label>
                            <Select id="allowedWorkDays" name="allowedWorkDays" variant="secondary" selectionMode="multiple" value={allowedWorkDays} onChange={setAllowedWorkDays}>
                                <Select.Trigger>
                                    <Select.Value/>
                                    <Select.Indicator/>
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox selectionMode="multiple">
                                        {days.map((day) => (
                                            <ListBox.Item id={day.id} textValue={day.name}>
                                                {day.name}
                                                <ListBox.ItemIndicator/>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="allowedWorkTime">Allowed work time</Label>
                        <Slider id="allowedWorkTime" name="allowedWorkTime" variant="secondary" value={allowedWorkTimeRange} maxValue={24} minValue={0} step={0.25} onChange={setAllowedWorkTimeRange}>
                            <Slider.Output/>
                            <Slider.Track>
                                {({state}) => (
                                    <div>
                                        <Slider.Fill/>
                                        {state.values.map((_, index) => (
                                            <Slider.Thumb key={index} index={index} />
                                        ))}
                                    </div>
                                )}
                            </Slider.Track>
                        </Slider>
                    </div>

                    <div className="flex flex-col">
                        <Checkbox variant="secondary" value={includeHolidays} onChange={setIncludeHolidays}>
                            <Checkbox.Content>
                                <Checkbox.Control>
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                                Include Holidays
                            </Checkbox.Content>
                        </Checkbox>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <Label htmlFor="template">Template</Label>
                        <Select id="template" name="template" variant="secondary" value={document} onChange={(_, value: number) => {setDocument(value)}}>
                            <Select.Trigger>
                                <Select.Value/>
                                <Select.Indicator/>
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    {documents.map((document) => (
                                        <ListBox.Item id={document.id} textValue={document.name}>
                                            {document.name}
                                            <ListBox.ItemIndicator/>
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <Button className="w-full" type="submit"><RotateCcw/> Generate</Button>
                </Form>
            </Card>

            <Card className="grow flex flex-col">
                <Form className="grow flex flex-col">
                    <Select></Select>
                    <div className="grow flex flex-col justify-center">
                        <div className="flex justify-center">
                            No preview available...
                        </div>
                    </div>
                    <Button className="w-full" type="submit" isDisabled><Download/> Download</Button>
                </Form>
            </Card>
        </div>
    </div>
}

export default Application
