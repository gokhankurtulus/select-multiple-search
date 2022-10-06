<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Select Multiple Search</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="select-multiple-search-ui.css">
    <!-- Example form styles, you don't need to use them -->
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        .example_container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }

        form {
            width: 500px;
            max-width: 100%;
            display: flex;
            flex-flow: column nowrap;
            gap: .5rem;
            padding: .5rem;
        }

        input {
            width: 100%;
            flex: 1;
            padding: 0.5rem !important;
            outline: none;
            border-radius: 5px;
            font-size: 1rem;
            border: 1px solid #CCCCCC;
            background: #FFF;
            transition: .2s;
        }

        input[type="submit"] {
            cursor: pointer;
            background: #3995DB;
            color: #FFF;
        }
    </style>
</head>
<body>
<div class="example_container">
    <form method="post">
        <label for="manufacturer">Manufacturer (This element has required but doesn't have multiple)</label>
        <select id="manufacturer" name="manufacturer" required>
            <option value="">Please Select</option>
            <option value="1">AMD</option>
            <option value="2">NVIDIA</option>
        </select>
        <label for="brand">Brand (This element has multiple)</label>
        <select id="brand" name="brand[]" multiple>
            <option value="">Please Select</option>
            <option selected value="1">ASUS</option>
            <option value="2">ASROCK</option>
            <option value="3">EVGA</option>
            <option value="4">GALAX</option>
            <option value="5">GIGABYTE</option>
            <option selected value="6">MSI</option>
            <option value="7">SAPPHIRE</option>
        </select>
        <label for="memory">Memory (This element has required & multiple)</label>
        <select id="memory" name="memory[]" multiple required>
            <option selected value="1">8GB</option>
            <option value="2">10GB</option>
            <option selected value="3">12GB</option>
            <option value="4">16GB</option>
            <option value="5">24GB</option>
        </select>
        <label for="output">Output (This element has optgroup)</label>
        <select id="output" name="output[]" multiple>
            <optgroup label="Display Port">
                <option value="1">DP 1</option>
                <option value="2">DP 2</option>
                <option value="3">DP 3</option>
                <option value="4">DP 4</option>
            </optgroup>
            <optgroup label="HDMI">
                <option value="5">HDMI 1</option>
                <option value="6">HDMI 2</option>
                <option value="7">HDMI 3</option>
                <option value="8">HDMI 4</option>
            </optgroup>
        </select>
        <input type="submit" name="search" value="Search">
    </form>
    <?php
    if (isset($_POST['search'])) {
        echo '<pre>';
        var_dump($_POST);
        echo '</pre>';
    }
    ?>
</div>
<script src="select-multiple-search.js"></script>
<script>
    selectMultipleSearch('manufacturer');
    selectMultipleSearch('brand');
    selectMultipleSearch('memory');
    selectMultipleSearch('output');
</script>
</body>
</html>