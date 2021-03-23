---
id: doc1
title: הטבלאות העיקריות 
sidebar_label: הטבלאות העיקריות 
slug: /
---

# 

-   **`DataFactoryRaw.dbo.LabResults` **

בטבלת חומרי הגלם. הטבלה כוללת את נתוני המעבדות כפי שנשלחו הישר מהקבצים.
הטבלה הראשונה אליה המסלול כותב את המידע.

-   **`DataFactoryOp.dbo.LabResults_STG` **

טבלת הביניים של המסלול. הטבלה אליה החומר נכתב בצורתו המטוייבת – כלומר
לאחר שעבר את הולידציות והטיובים. לאחר שלבי ההפלות וההצלבות עבור כל סגח
החומר נכתב לטבלה זו בצורת insert only כך שרשומה שהגיעה על ידי המעבדה 100
פעמים לצורך העניין, תופיע כאן 100 פעמים, בצורתה המטוייבת (עם ריפוד אפסים
למשל ועוד. *ראה ערך טיובים והפלות.*

-   **`DataFactoryMRR.dbo.LabResults`**

הטבלה המטויבת והשלמה. הטבלה אליה מגיע החומר הסופי לאחר שעבר את המסלול.
זהו הקצה של המסלול למעשה ומהשלב הזה מתחיל שלב ההנגשה. כלומר זוהי הנקודה
המשותפת של כלל לקוחות המידע, ואחריה המידע מונגש מעליה לכל לקוח בצורתו
הספציפית. למשל בטבלאות \[DataFactoryMRR\].\[dbo\].\[ LabResults\_XRM\]
עבור הXRM, כview עבור מגן אבות ועוד. בהקשרי המסלול כשאין בלבול נקרא
לטבלה הזו בקיצור MRR.

-   **`DataFactoryMRR.dbo.LabResults_SerologyKits`** 

אדם מבצע מספר בדיקות כדי לקבל תוצאת סרולוגיה (נוגדים לקורונה). המשמעות
היא שהאדם בפועל מבצע בדיקה דרך 2 (או 1 או במקרים מסויימים 3) מכשירים
שונים אשר נקראים קיטים, והחישוב של סכום שתי התוצאות של כל אחד מהקיטים
יניב את התוצאה הסופית. בטבלה LabResults שבMRR יופיעו התוצאות הסופיות
(לפעמים נקרא להם גם תוצאות סיכומיות), ובטבלה הזו יופיעו הקיטים הבודדים
(לפעמים נקרא להם גם התצאות הפרטניות). דרך הטבלה הזו נוכל לחשב תוצאות
סיכומיות עבור מעבדות שלא מחשבות בעצמן, או לאמת\\ לפסול תוצאות סיכומיות.

-   **`DataFactoryMRR.dbo.LabResults_History`**

הטבלה אשר מכילה כל שינוי שבוצע בטבלת LabResults שבMRR. ממנה רצים בעיקר
תהליכים שקשורים להנגשה לXRM. כלומר ההנגשה מבוססת על הטבלה הזו ולכן אם יש
עדכון על רשומה בMRR אך היא לא נכתבת לטבלה הזו, היא לא תונגש לXRM. בהקשרי
המסלול כאשר אין בלבול נכנה את הטבלה "היסטורי".

---

## עמודות חשובות

> העמודות אשר נתאר לרוב מופיעות
 במספר רב של טבלאות לאורך המסלול

-   **SFID**

מזהה רשומה פר הזרמה. Hash שיג'ונרט עבור כל רשומה שמגיעה ויסחב איתה מהraw
עד הmrr.

 

-   **EntityID**

הPK של LabResults - עמודת EntityId (שמורכבת מLabCode || IDNum ||
StickerNumber). אותה עמודה היא גם FK בטבלת SerologyKits וניתן לראות אותה
בעמודת MatchingFinalReultEntityId.\
הPK של SerologyKits - עמודת EntityId (שמורכבת מLabCode || IDNum ||
StickerNumber || MethodCode)

בעדכון של רשומה אנחנו לא נעדכן את הentity id. זאת מאחר וישנן מעבדות
ששולחות את אותה הבדיקה ולאחר כמה דקות עדכון שלה, בגלל שהם שלחו בפעם
הראשונה תז לא תקין. עדכון באופן כללי זה דבר לגיטימי שאנחנו תומכים בו
באמצעות פעולת merge בפרוצדורות
`[DataFactoryOp].[dbo].[Merge_LabResults]`
ו\[DataFactoryOp\].\[dbo\].\[Merge\_LabResults\_SerologyKits\]. הבעיה
היא שעדכון על אחד משדות הPK יוצר בעיה שכן אנחנו מרכיבים את הentity id על
פי כן ואז הרשומה שבעדכון תגיע עם entity id אחר. בפונקציות הmerge אנחנו
עושים את הMerge לפי השדות עצמם (כלומר לפי הid, sticker, labcode ולא לפי
הentity id) ולכן אם מגיע תז עם מקף בפעם הראשונה ותז תקין בפעם השניה,
במהלך המסלול אנחנו נסדר את התז הלא ולידי כך שיעבור לצורתו הולידית. יוצא
שאנחנו מצליחים לעדכן את שתי הרשומות שהתקבלו אחת בשניה ובmrr אכן יש לנו
עדכון ולא כפילות מיותרת. הבעיה היא שהentity id הצביע רק לרשומה האחרונה
שעידכנה אותו ובניטור לצורך העניין הרשומה הראשונה הייתה נראית כמו נפילה.

הפיתרון הוא לא לעדכן entity id בmerge וכך אוכל לראות בraw את הרשומה
האחרונה שהגיע - זו שעידכנה את הרשומה בmrr, דרך הsfid (שהוא משמש כversion
id למעשה. מזהה רשומה פר הזרמה). וכן לא אפגע בצריכה של הרשומה מצד אלון
שכן לא יהיה בlab results עוד entity id חדש על אותה רשומה.

 

-   **ResultRemark**

תקין ששדה result remark יכלול טקסט – זה מהותו. בעבור בדיקות סרולוגיה אנו
נרצה שהשדה הזה יכלול את הציון של הבדיקה הסורולוגית, בעוד שבשדה result
יופיע הסיכום שלה – כלומר חיובי\\ שלילי וכו'.

 

 

**ג'ובים בטאלנד**

 

**ג'וב ראשי - LabResults\_Files\_to\_SF\_MRR קורא לג'ובים:**

-   **Read Files **

    -   קריאה של הקבצים מהכספות לפי תיקיות ובתוכן לפי קבצים, עם כתיבה
        לdata factory raw lab results, לאחר מכן עיבוד מידע וולידציות עד
        הכתיבה לdata factory op labresults stg. בדרך לstg נכתוב את
        הרשומות הרלוונטיות עבור איגום מטושים לטבלה ייעודיות מדיבי op
        וכנל על הרשומות הרלוונטיות של סרולוגיה.

-   **Swab Pooling **

    -   איגום מטושים**,** לוקחים את המידע מlab results swab pools שבop
        וממנו מצליבים עם טבלת דיגומים, עד אשר אנחונ מקבלים את הרשומות
        הרלוונטיות של האיגום כבדיקות רגילות לכל דבר, וכותבים לstg.

-   **Serology **

    -   חישוב תוצאה סיוכמית לסרולוגיה על ידי משרד הבריאות. שליפה מהטבלה
        הרלוונטית בop, וניסיון הצלבה עם קיט תואם מהרשומות שהגיעו מאותה
        ריצה או לחלופין לאחר מכן אם לא היית ההצלבה אז עם serology kits
        (כלומר קיטים מריצות קודמות), ולבסוף כתיבה לstg.

-   **Merge 1 **

    -   נבצע insert or update מstg לmrr lab reuslts עבור pcrים
        וסרולוגיה סופי.

-   **Merge 2 **

    -   נבצע insert or update מstg לmrr lab reuslts serology kits עבור
        סרולוגיה קיטים פרטניים.

-   **Retro Data Transformation**

    -   נבצע העשרת מרשם אוכלוסין, אימותי פרוטוקול סרולוגיה וכו'. העשרות
        רטרו אקטיביות


## Headers

# H1 - Create the best documentation

## H2 - Create the best documentation

### H3 - Create the best documentation

#### H4 - Create the best documentation

##### H5 - Create the best documentation

###### H6 - Create the best documentation

---

## Emphasis

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

---

## Lists

1. First ordered list item
1. Another item

- Unordered sub-list.

1. Actual numbers don't matter, just that it's a number
1. Ordered sub-list
1. And another item.

- Unordered list can use asterisks

* Or minuses

- Or pluses

---

## Links

[I'm an inline-style link](https://www.google.com/)

[I'm an inline-style link with title](https://www.google.com/ "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. http://www.example.com/ or <http://www.example.com/> and sometimes example.com (but not on GitHub, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org/
[1]: http://slashdot.org/
[link text itself]: http://www.reddit.com/

---

## Images

Here's our logo (hover to see the title text):

Inline-style: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

Reference-style: ![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 2'

Images from any folder can be used by providing path to file. Path should be relative to the original markdown file or absolute to the `/static` folder.

![img](/img/swab.png)

---

## Code

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

```python
s = "Python syntax highlighting"
print(s)
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

```js {2}
function highlightMe() {
  console.log('This line can be highlighted!');
}
```

---

## Tables

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

---

## Blockquotes

> Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

---

## Inline HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

---

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but... This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

---

## Admonitions

:::note

This is a note

:::

:::tip

This is a tip

:::

:::important

This is important

:::

:::caution

This is a caution

:::

:::warning

This is a warning

:::
