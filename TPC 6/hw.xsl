<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title> Trabalho para Casa </title>
            </head>
            <body>
                <h1 align="center">Trabalho para Casa</h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <!-- Template para Meta .....................................................-->
    <xsl:template match="meta">
        <table width="100%" border="0">
            <tr>
                <td width="50%"> <b>Key: </b> <font color="#000080"> <xsl:value-of select="key"/> </font> </td>
            </tr>
            <tr>
                <td width="50%"> <b>Title: </b> <font color="#000080"> <xsl:value-of select="title"/></font> </td>   
            </tr>    
            <tr>
                <xsl:if test="subtitle">
                    <td width="50%"> <b>Subtitle: </b> <font color="#000080"> <xsl:value-of select="subtitle"/></font> </td>
                </xsl:if>                
                <td width="50%"> <b>Supervisor: </b><font color="#000080"><a href="{supervisor/@url}"><xsl:value-of select="supervisor"/></a> </font> </td>   
            </tr> 
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    
    <!-- Template para Workteam .....................................................-->
    <xsl:template match="workteam">
        <h3>WorkTeam: </h3>
        <ol>
            <xsl:apply-templates select="worker"/>
        </ol>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="worker">
        <xsl:value-of select="@num"/>
        .
        <xsl:value-of select="name"/>
        -
        <a href="mailto:{email}"> <xsl:value-of select="email"/> </a>        
    </xsl:template>
    
    <!-- Template para Abstract .....................................................-->
    <xsl:template match = "abstract">  
        <h3>Abstract: </h3>
        <xsl:apply-templates select="p"/>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="link">
        <a href="{@url}"> <xsl:apply-templates/> </a>
    </xsl:template>
    
    <!-- Template para Deliverables .....................................................-->
    <xsl:template match="deliverables">
        <h3>Deliverables: </h3>
        <ul>
            <xsl:apply-templates select="link" mode="deliverable"/> 
        </ul>
        <hr/>    
    </xsl:template>
    
    <xsl:template match="link" mode="deliverable">
        <li> <a href="{@url}"> <xsl:apply-templates/> </a> </li>
    </xsl:template>
    
</xsl:stylesheet>